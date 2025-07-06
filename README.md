# ALLOUT-V2

일기 작성 웹앱입니다.

## 기술 스택

- Next.js 14
- TypeScript
- Prisma (PostgreSQL)
- Jotai (상태 관리)
- Tailwind CSS
- Playwright (테스트)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 데이터베이스 마이그레이션
npx prisma migrate dev

# Prisma 클라이언트 생성
npx prisma generate
```

## 테스트

```bash
# 모든 테스트 실행
npm test

# UI 모드로 테스트 실행 (브라우저에서 실시간으로 확인)
npm run test:ui

# 브라우저 창을 열고 테스트 실행
npm run test:headed

# 디버그 모드로 테스트 실행
npm run test:debug

# 테스트 리포트 보기
npm run test:report
```

## 테스트 구조

- `tests/auth.spec.ts` - 인증 관련 테스트
- `tests/navigation.spec.ts` - 네비게이션 테스트
- `tests/integration.spec.ts` - 통합 테스트
- `tests/utils/auth-helper.ts` - 인증 헬퍼 함수

## 주요 기능

- 사용자 회원가입/로그인
- 일기 작성 (7단계 프로세스)
- 일기 기록 조회
- 감정/활동 통계 분석
- 연속 작성일수 추적

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
