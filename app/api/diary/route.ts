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
      authorId,
    } = body;

    // 필수 필드 검증
    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (!authorId) {
      return NextResponse.json(
        { error: 'Author ID is required' },
        { status: 400 }
      );
    }

    // 일기 데이터 저장 (authorId 포함)
    const diary = await prisma.diary.create({
      data: {
        mood,
        emotions,
        activities,
        content,
        distortions,
        alternativeThoughts,
        moodChange,
        authorId,
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const authorId = searchParams.get('authorId');

    if (authorId) {
      // 특정 사용자의 일기만 조회
      const diaries = await prisma.diary.findMany({
        where: {
          authorId: authorId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({ diaries });
    } else {
      // 모든 일기 조회 (기존 동작)
      const diaries = await prisma.diary.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json({ diaries });
    }
  } catch (error) {
    console.error('Error fetching diaries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch diaries' },
      { status: 500 }
    );
  }
} 