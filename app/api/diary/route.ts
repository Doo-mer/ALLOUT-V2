import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received diary data:', body);
    
    const {
      mood,
      emotions,
      activities,
      content,
      distortions,
      alternativeThoughts,
      moodChange,
    } = body;

    // 필수 필드 검증
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // 일기 데이터 저장 (authorId 제거)
    const diary = await prisma.diary.create({
      data: {
        mood,
        emotions,
        activities,
        content,
        distortions,
        alternativeThoughts,
        moodChange,
      },
    });

    console.log('Diary saved successfully:', diary);
    return NextResponse.json({ success: true, diary }, { status: 201 });
  } catch (error) {
    console.error('Error saving diary:', error);
    return NextResponse.json(
      { error: 'Failed to save diary', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const diaries = await prisma.diary.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ diaries });
  } catch (error) {
    console.error('Error fetching diaries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch diaries' },
      { status: 500 }
    );
  }
} 