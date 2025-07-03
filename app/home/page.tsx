'use client';

import React from 'react';
import App from '@/shared/layout/App';
import Container from '@/shared/layout/Container';
import Row from '@/shared/layout/Row';
import Column from '@/shared/layout/Column';
import Calendar from '@/shared/component/CalendarGrid';
import Image from 'next/image';
import Link from 'next/link';

const MedalIcon: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-lg"
  >
    {/* 메달 원판 */}
    <circle
      cx="32"
      cy="44"
      r="16"
      fill="url(#medalGradient)"
      stroke="#F59E0B"
      strokeWidth="4"
    />
    {/* 메달 중앙 별 */}
    <path
      d="M32 34L34.4721 39.9443L41.0451 40.5685L36.5226 45.0557L37.4322 51.4315L32 48L26.5678 51.4315L27.4774 45.0557L22.9549 40.5685L29.5279 39.9443L32 34Z"
      fill="#FFF"
    />

    <defs>
      <radialGradient
        id="medalGradient"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(32 44) scale(16)"
      >
        <stop offset="0%" stopColor="#FDD835" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
  </svg>
);

interface ChallengeCardProps {
    /** 달성 일수 */
    days: number;
    /** 목표 일수 */
    target: number;
  }
  

const ChallengeCard: React.FC<ChallengeCardProps> = ({ days, target }) => {
    const progress = Math.min(days / target, 1);
    const degree = progress * 360;
  
    return (
      <div className="relative w-32 h-36 rounded-2xl">
        {/* 동적 테두리: 달성률에 따라 conic-gradient로 표시 */}
        <div
          className="inset-0 rounded-2xl"
          style={{
            position: "absolute",
            border: '6px solid',
            borderImage: `conic-gradient(#8B5CF6 ${degree}deg, #3F3F46 0deg) 1`,
          }}
        />
  
        {/* 카드 본문 */}
        <Column className="inset-0 p-4 rounded-[1rem] items-center justify-between">
          <MedalIcon size={48} />
          <span className="text-white font-semibold mt-2">
            {days}일 연속
          </span>
        </Column>
      </div>
    );
  };


export default function HomePage() {
    return (
        <App>
            <Container className="bg-black overflow-y-auto snap-y snap-mandatory h-screen">
                <Column className="w-full">
                    {/* 상단 섹션 */}
                    <Column className="w-full justify-between gap-8 snap-start">
                        <Column className="w-full ml-6 mt-12">
                            <div className="text-[1.75rem] text-white font-medium font-pretendard mb-[-0.25rem]">
                                안녕하세요 미모마님
                            </div>
                            <div className="text-[1.75rem] text-neutral-500 font-medium font-pretendard">
                                오늘은 무슨 일이 있으셨나요?
                            </div>
                        </Column>

                        <Calendar />

                        <div className="mx-auto mb-8">
                            <Link href={"write"}>
                                <div className="flex justify-center items-center w-28 h-28 bg-purple-600 rounded-full text-white font-medium text-[1.25rem] hover:bg-purple-500 duration-200">시작</div>
                            </Link>
                        </div>
                    </Column>

                    {/* 하단 섹션 */}
                    <Column className="bg-neutral-800 w-full h-screen snap-start flex items-center">
                        <Row className="gap-5 p-6">
                            <Link href={"/record"}>
                                <div
                                    className="bg-black text-white h-14 w-42 rounded-4xl flex items-center justify-center gap-2 hover:bg-neutral-900 duration-200"
                                >
                                    <Image src="./book.svg" alt="고민 기록" width={32} height={32} />
                                    고민 기록
                                </div>
                            </Link>
                            
                            <Link href={"/document"}>
                                <div
                                    className="bg-black text-white h-14 w-42 rounded-4xl flex items-center justify-center gap-2 hover:bg-neutral-900 duration-200"
                                >
                                    <Image src="./document.svg" alt="분석 보고서" width={32} height={32} />
                                    분석 보고서
                                </div>
                            </Link>
                            
                        </Row>

                        <Column className="w-[90%] gap-4 bg-black py-[1rem] px-[1rem] rounded-[1rem] mb-[2rem]">
                            <div className="flex justify-between text-xs text-neutral-400 mb-4">
                                <span className='text-[1rem]'>기록 습관 만들기</span>
                                <span className="text-[1rem] text-right">목표 일주일 &gt;</span>
                            </div>
                            <div className="flex flex-col items-center justify-center py-4">
                                <div className="text-white text-[4rem] font-bold mb-[-1rem]">13</div>
                                <div className="text-white text-[1rem] mt-1">일 연속</div>
                            </div>
                            <div className="flex justify-center mt-2">
                                {[...Array(7)].map((_, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={`w-12 h-12 rounded-full ${i < 3 ? 'bg-purple-600' : i === 3 ? 'border-2 border-white' : 'border-2 border-neutral-800'
                                                }`}
                                        />
                                    );
                                })}
                            </div>
                        </Column>

                        <Column className="w-[90%] items-center gap-4 bg-black py-[1rem] px-[1rem] rounded-[1rem] ">
                            <Column className='text-center'>
                                <h2 className="text-xl font-bold text-white">새로운 도전</h2>
                                <p className="text-neutral-400">하루 한번 일기 습관을 만들어 보세요</p>
                            </Column>

                            <Row className="justify-center gap-4 mt-4 w-full">
                                <ChallengeCard days={5} target={10}/>
                                <ChallengeCard days={10} target={20}/>
                                <ChallengeCard days={30} target={35}/>
                            </Row>
                        </Column>


                    </Column>

                </Column>
            </Container>
        </App>
    );
}