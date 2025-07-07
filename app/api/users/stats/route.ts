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
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // 사용자의 모든 일기 조회 (날짜순 정렬)
    const diaries = await prisma.diary.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        createdAt: true,
      },
    });

    // 연속 작성일수 계산
    let consecutiveDays = 0;
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 최근 20일 작성 횟수 계산
    const twentyDaysAgo = new Date(today);
    twentyDaysAgo.setDate(today.getDate() - 20);
    
    let recentTwentyDaysCount = 0;
    const recentDiaries = diaries.filter(diary => {
      const diaryDate = new Date(diary.createdAt);
      diaryDate.setHours(0, 0, 0, 0);
      return diaryDate >= twentyDaysAgo && diaryDate <= today;
    });

    recentTwentyDaysCount = recentDiaries.length;

    // 연속 작성일수 계산
    if (diaries.length > 0) {
      const dates = diaries.map(diary => {
        const date = new Date(diary.createdAt);
        date.setHours(0, 0, 0, 0);
        return date;
      });

      // 중복 제거 (같은 날 여러 번 작성한 경우)
      const uniqueDates = [...new Set(dates.map(date => date.getTime()))].map(time => new Date(time));
      uniqueDates.sort((a, b) => a.getTime() - b.getTime());

      // 연속일수 계산
      let maxStreak = 0;
      const currentDate = new Date(today);
      currentDate.setHours(0, 0, 0, 0);

      // 오늘부터 역순으로 확인
      for (let i = 0; i < 365; i++) { // 최대 1년치 확인
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        checkDate.setHours(0, 0, 0, 0);

        const hasDiaryOnDate = uniqueDates.some(date => {
          const diaryDate = new Date(date);
          diaryDate.setHours(0, 0, 0, 0);
          return diaryDate.getTime() === checkDate.getTime();
        });

        if (hasDiaryOnDate) {
          currentStreak++;
          if (currentStreak > maxStreak) {
            maxStreak = currentStreak;
          }
        } else {
          break; // 연속이 끊어지면 종료
        }
      }

      consecutiveDays = maxStreak;
    }

    return NextResponse.json({
      userId,
      consecutiveDays,
      recentTwentyDaysCount,
      totalDiaries: diaries.length,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
} 