import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // 모든 일기 불러오기 (emotions, activities만)
    const diaries = await prisma.diary.findMany({
      where: { authorId: userId },
      select: {
        emotions: true,
        activities: true,
      },
    });

    // 감정 집계
    const emotionCounts: Record<string, number> = {};
    diaries.forEach(diary => {
      (diary.emotions || []).forEach(emotion => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
    });
    const emotionStats = Object.entries(emotionCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // 활동 집계
    const activityCounts: Record<string, number> = {};
    diaries.forEach(diary => {
      (diary.activities || []).forEach(activity => {
        activityCounts[activity] = (activityCounts[activity] || 0) + 1;
      });
    });
    const activityStats = Object.entries(activityCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return NextResponse.json({
      emotionStats,
      activityStats,
    });
  } catch (error) {
    console.error('Error fetching user summary:', error);
    return NextResponse.json({ error: 'Failed to fetch user summary' }, { status: 500 });
  }
} 