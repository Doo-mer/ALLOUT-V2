'use client'

import { useState } from 'react';
import { useAtom } from 'jotai';
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Header from '@/shared/component/Header'
import Column from '@/shared/layout/Column'
import SubTitle from '@/shared/component/SubTitle'
import PrimaryButton from '@/shared/component/PrimaryButton';
import { activitiesAtom } from '@/shared/store/diaryStore';

const activities = [
  { emoji: '🏠', label: '가족' },
  { emoji: '🧑‍🤝‍🧑', label: '친구' },
  { emoji: '❤️', label: '사랑받는 느낌' },
  { emoji: '💼', label: '일' },
  { emoji: '✏️', label: '학교' },
  { emoji: '🛏️', label: '잠' },
  { emoji: '🏀', label: '운동' },
  { emoji: '🍕', label: '음식' },
  { emoji: '🛋️', label: '휴식' },
  { emoji: '📺', label: '영상 시청' },
  { emoji: '🌍', label: '여행' },
  { emoji: '🎸', label: '취미' },
  { emoji: '🎮', label: '게임' },
  { emoji: '🛒', label: '쇼핑' },
  { emoji: '🔒', label: '사용자화' },
]

export default function ActivityPage() {
  const [selectedActivities, setSelectedActivities] = useAtom(activitiesAtom);

  return (
    <App>
      <Container>
        <Column className="flex-1 justify-between h-full">
          <Header title="일기" />
          <div className="space-y-4 flex-1 flex flex-col min-h-0 p-4">
            <SubTitle>어떤 활동을 하셨나요?</SubTitle>
            
            {/* Scrollable Grid of activities */}
            <div className="h-[85%] overflow-y-auto">
              <div className="grid grid-cols-3 gap-4 pb-4">
                {activities.map((act, i) => {
                  const isSelected = selectedActivities.includes(act.label);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedActivities(selectedActivities.filter(activity => activity !== act.label));
                        } else {
                          setSelectedActivities([...selectedActivities, act.label]);
                        }
                      }}
                      className={`flex flex-col items-center p-2 rounded-lg transform transition-transform box-border ${
                        isSelected ? 'bg-purple-800 border-2 border-purple-500' : 'bg-gray-800 border-2 border-transparent'
                      }`}
                    >
                      <span className="text-4xl mb-2">{act.emoji}</span>
                      <span className="text-sm text-white">{act.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <PrimaryButton href='/write/4'>다음</PrimaryButton>
        </Column>
      </Container>
    </App>
  )
}
