'use client';

import React, { useEffect, useState } from 'react';
import App from '@/shared/layout/App';
import Container from '@/shared/layout/Container';
import Row from '@/shared/layout/Row';
import Column from '@/shared/layout/Column';
import Calendar from '@/shared/component/CalendarGrid';
import Image from 'next/image';
import Link from 'next/link';
import { useUserData } from '@/shared/hooks/useUserData';
import { useAtom } from 'jotai';
import { userAtom } from '@/shared/store/userStore';
import type { Diary } from '@/shared/store/userStore';

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
    <div className="relative w-32 h-28 rounded-2xl">
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
      <Column className="inset-0 pt-4 rounded-[1rem] items-center justify-between">
        <MedalIcon size={48} />
        <span className="text-white font-semibold mt-2">
          {target}번 작성
        </span>
      </Column>
    </div>
  );
};

// 왜곡 label 매핑
const distortionLabels = [
  '최악으로 인식하기',
  '이분법적 사고',
  '감정적 추론',
  '부정적 확대 해석',
  '긍정적인 상황 최소화하기',
  '바로 결론으로 넘어가기',
];

const moodIcons: Record<string, string> = {
  '매우 슬픔': '😭',
  '슬픔': '😥',
  '보통': '😐',
  '좋음': '😊',
  '매우 좋음': '😆',
};

const moodChangeIcons: Record<string, string> = {
  '매우 나빠짐': '⬇️',
  '나빠짐': '↘️',
  '변화 없음': '➖',
  '좋아짐': '↗️',
  '매우 좋아짐': '⬆️',
};

const distortionIcons = [
  '💣', // 최악으로 인식하기
  '☯️', // 이분법적 사고
  '🤔', // 감정적 추론
  '⛔', // 부정적 확대 해석
  '+',  // 긍정적인 상황 최소화하기
  '🦕', // 바로 결론으로 넘어가기
];

// DiaryModal 컴포넌트 타입 명시
const DiaryModal: React.FC<{ open: boolean; onClose: () => void; diaries: Diary[] }> = ({ open, onClose, diaries }) => {
  if (!open || !diaries || diaries.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-neutral-900 shadow-xl w-[90vw] max-w-md max-h-[70vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-neutral-700">
          <span className="font-bold text-lg text-purple-300">일기 상세 ({diaries.length}개)</span>
          <button onClick={onClose} className="text-neutral-400 hover:text-purple-400 text-2xl">&times;</button>
        </div>
        <div className="p-4 overflow-y-auto text-white space-y-6" style={{ minHeight: 120 }}>
          {diaries.map((diary) => {
            // 기존 상세 카드 UI 재활용
            const distortionNames = (diary.distortions || []).map(idx => ({
              label: distortionLabels[idx] || `왜곡 ${idx + 1}`,
              icon: distortionIcons[idx] || '❓'
            }));
            return (
              <div key={diary.id} className="bg-neutral-800 rounded p-3 mb-2">
                <div className="text-xs text-neutral-400 mb-2">
                  {new Date(diary.createdAt).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-800 text-purple-100 text-xs">
                    {moodIcons[diary.mood || ''] || '🙂'} <b>기분</b> {diary.mood || '-'}
                  </span>
                  {diary.emotions?.map((e, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-pink-800 text-pink-100 text-xs">
                      😶 <b>감정</b> {e}
                    </span>
                  ))}
                  {diary.activities?.map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-800 text-blue-100 text-xs">
                      🏷️ <b>활동</b> {a}
                    </span>
                  ))}
                </div>
                {distortionNames.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {distortionNames.map((d, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-800 text-yellow-100 text-xs">
                        {d.icon} <b>왜곡</b> {d.label}
                      </span>
                    ))}
                  </div>
                )}
                {diary.moodChange && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-indigo-800 text-indigo-100 text-xs">
                      {moodChangeIcons[diary.moodChange] || '🔄'} <b>감정 변화</b> {diary.moodChange}
                    </span>
                  </div>
                )}
                {diary.alternativeThoughts && (
                  <div className="bg-neutral-900 rounded p-3 mt-2">
                    <span className="inline-flex items-center gap-1 font-semibold text-green-200 mb-1">
                      💡 대안적 사고
                    </span>
                    <div className="whitespace-pre-line break-words mt-1 text-sm">{diary.alternativeThoughts}</div>
                  </div>
                )}
                <div className="bg-neutral-900 rounded p-3 mt-2">
                  <span className="inline-flex items-center gap-1 font-semibold text-purple-300 mb-1">
                    📖 일기 내용
                  </span>
                  <div className="whitespace-pre-line break-words mt-1 text-sm">{diary.content}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [user, setUser] = useAtom(userAtom);
  const { userStats, userDiaries, loading, error } = useUserData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDiaries, setSelectedDiaries] = useState<Diary[]>([]);

  // 컴포넌트 마운트 시 localStorage에서 사용자 정보 로드
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr && !user) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, [user, setUser]);

  // 캘린더용 일기 작성 상태 배열 생성 (계정 생성일 기준)
  const generateCalendarDays = (): ('done' | 'today' | 'empty')[] => {
    const days: ('done' | 'today' | 'empty')[] = Array(20).fill('empty');
    
    if (!user) return days;

    const accountCreatedAt = new Date(user.createdAt);
    accountCreatedAt.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 계정 생성일부터 20일 동안의 일기 작성 여부 확인
    for (let i = 0; i < 20; i++) {
      const checkDate = new Date(accountCreatedAt);
      checkDate.setDate(accountCreatedAt.getDate() + i);
      checkDate.setHours(0, 0, 0, 0);

      // 20일이 지나지 않았거나 오늘보다 미래인 경우 empty로 유지
      if (checkDate > today) {
        days[i] = 'empty';
        continue;
      }

      const hasDiaryOnDate = userDiaries.some(diary => {
        const diaryDate = new Date(diary.createdAt);
        diaryDate.setHours(0, 0, 0, 0);
        return diaryDate.getTime() === checkDate.getTime();
      });

      if (hasDiaryOnDate) {
        days[i] = 'done';
      }
    }

    // 오늘 날짜가 20일 이내인 경우 TODAY 표시
    const daysSinceCreation = Math.floor((today.getTime() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceCreation < 20) {
      const todayIndex = daysSinceCreation;
      if (days[todayIndex] === 'empty') {
        days[todayIndex] = 'today';
      }
    }

    return days;
  };

  // 캘린더 클릭 핸들러 (여러 개 일기 지원)
  const handleDayClick = (idx: number) => {
    if (!user) return;
    const accountCreatedAt = new Date(user.createdAt);
    accountCreatedAt.setHours(0, 0, 0, 0);
    const targetDate = new Date(accountCreatedAt);
    targetDate.setDate(accountCreatedAt.getDate() + idx);
    targetDate.setHours(0, 0, 0, 0);

    // 해당 날짜의 모든 일기 찾기
    const diaries = userDiaries.filter(d => {
      const diaryDate = new Date(d.createdAt);
      diaryDate.setHours(0, 0, 0, 0);
      return diaryDate.getTime() === targetDate.getTime();
    });
    if (diaries.length > 0) {
      setSelectedDiaries(diaries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setModalOpen(true);
    }
  };

  // 에러 처리
  if (error) {
    console.error('Error loading user data:', error);
  }

  return (
    <App>
      <Container className="bg-black overflow-y-auto overflow-x-hidden snap-y snap-mandatory h-screen relative">
        <Column className="w-full">
          {/* 상단 섹션 */}
          <Column className="w-full justify-between gap-8 snap-start">
            <Column className="w-full ml-6 mt-12">
              <div className="text-[1.25rem] phone:text-[1.5rem] text-white font-medium font-pretendard mb-[-0.25rem]">
                안녕하세요
              </div>
              <div className="text-[1.25rem] phone:text-[1.5rem] text-neutral-500 font-medium font-pretendard">
                오늘은 무슨 일이 있으셨나요?
              </div>
            </Column>

            <Calendar days={generateCalendarDays()} onDayClick={handleDayClick} />
            <DiaryModal open={modalOpen} onClose={() => setModalOpen(false)} diaries={selectedDiaries} />

            <div className="mx-auto mb-8">
              <Link className="flex justify-center items-center w-28 h-28 bg-purple-600 rounded-full text-white font-medium text-[1.25rem] hover:bg-purple-500 duration-200" href="/write/1">
                시작
              </Link>
            </div>
          </Column>

          {/* 하단 섹션 */}
          <Column className="bg-neutral-800 w-full h-screen snap-start flex items-center">
            <Row className='w-[90%] justify-between gap-4 m-4'>
              <Link href={"/record"} className='w-full'>
                <div
                  className="bg-black text-white h-14 rounded-4xl flex items-center justify-center gap-2 hover:bg-neutral-900 duration-200"
                >
                  <Image src="./book.svg" alt="고민 기록" width={32} height={32} priority />
                  고민 기록
                </div>
              </Link>

              <Link href={"/document"} className='w-full'>
                <div
                  className="bg-black text-white h-14 rounded-4xl flex items-center justify-center gap-2 hover:bg-neutral-900 duration-200"
                >
                  <Image src="./document.svg" alt="분석 보고서" width={32} height={32} priority />
                  분석 보고서
                </div>
              </Link>

            </Row>

            <Column className="w-[90%] gap-4 bg-black py-[1rem] px-[1rem] rounded-[1rem] mb-[2rem]">
              <div className="flex justify-between text-xs text-neutral-400 mb-4">
                <span className='text-[1rem]'>기록 습관 만들기</span>
                <span className="text-[1rem] text-right">목표 7번 &gt;</span>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-white text-[4rem] font-bold mb-[-1rem]">
                  {loading ? (
                    <div className="animate-pulse bg-neutral-700 w-24 h-16 rounded"></div>
                  ) : (
                    userStats?.consecutiveDays || 0
                  )}
                </div>
                <div className="text-white text-[1rem] mt-1">번 작성</div>
              </div>
              <div className="flex justify-center mt-2">
                {[...Array(7)].map((_, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-full ${i < (userStats?.consecutiveDays || 0)
                          ? 'bg-purple-600'
                          : i === (userStats?.consecutiveDays || 0)
                            ? 'border-2 border-white'
                            : 'border-2 border-neutral-800'
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
                <ChallengeCard days={loading ? 0 : (userStats?.consecutiveDays || 0)} target={10} />
                <ChallengeCard days={loading ? 0 : (userStats?.recentTwentyDaysCount || 0)} target={20} />
                <ChallengeCard days={loading ? 0 : (userStats?.totalDiaries || 0)} target={35} />
              </Row>
            </Column>


          </Column>

        </Column>
      </Container>
    </App>
  );
}