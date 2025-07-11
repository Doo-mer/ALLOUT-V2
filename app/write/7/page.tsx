'use client'

import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Header from '@/shared/component/Header'
import Column from '@/shared/layout/Column'
import SubTitle from '@/shared/component/SubTitle'
import { moodChangeAtom, diaryDataAtom, resetDiaryAtom } from '@/shared/store/diaryStore';
import PrimaryButton from '@/shared/component/PrimaryButton'
import Row from '@/shared/layout/Row';

const moodChanges = [
  { emoji: '😭', label: '매우 나빠짐' },
  { emoji: '😥', label: '나빠짐' },
  { emoji: '😐', label: '변화 없음' },
  { emoji: '😊', label: '좋아짐' },
  { emoji: '😆', label: '매우 좋아짐' },
];

export default function MoodChangePage() {
  const [selectedMoodChange, setSelectedMoodChange] = useAtom(moodChangeAtom);
  const [diaryData] = useAtom(diaryDataAtom);
  const [, resetDiary] = useAtom(resetDiaryAtom);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    if (isSubmitting) return; // 중복 방지
    setIsSubmitting(true);
    try {
      // 로그인된 사용자 정보 가져오기
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        alert('로그인이 필요합니다.');
        router.push('/login');
        return;
      }

      const user = JSON.parse(userStr);

      // DB에 데이터 저장 (authorId 포함)
      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...diaryData,
          authorId: user.id, // 사용자 ID 추가
        }),
      });

      if (response.ok) {
        // 성공 시 상태 초기화하고 홈으로 이동
        resetDiary();
        router.push('/home');
      } else {
        console.error('Failed to save diary');
        alert('저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error saving diary:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <App>
      <Container  className="flex flex-col justify-between">
          <Header title='일기' />
          <Column>
            <Column className="gap-[2rem] p-4">
              <SubTitle>일기를 적은 후 기분이 어떠신가요?</SubTitle>
              <Row className="flex space-x-2 mx-auto ">
                {moodChanges.map((mood, idx) => (
                  <div
                    key={idx}
                    className={`w-16 h-16 flex items-center justify-center rounded-lg box-border ${selectedMoodChange === mood.label ? 'border-2 border-purple-500 bg-purple-600' : 'border-2 border-transparent'}`}
                  >
                    <button
                      onClick={() => setSelectedMoodChange(mood.label)}
                      className="transform text-5xl transition-transform hover:scale-110"
                    >
                      {mood.emoji}
                    </button>
                  </div>
                ))}
              </Row>
            </Column>
          </Column>
        <PrimaryButton onClick={handleComplete} disabled={isSubmitting || !selectedMoodChange}>
          {isSubmitting ? '저장 중...' : '완료'}
        </PrimaryButton>
      </Container>
    </App>
  );
}
