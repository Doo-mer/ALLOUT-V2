'use client'

import Link from 'next/link'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Header from '@/shared/component/Header'
import Column from '@/shared/layout/Column'

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
  return (
    <App>
      <Container>
        <Header title="일기" />

        <Column className="flex-1 justify-between p-4">
          <div className="space-y-4">
            <h2 className="text-lg">어떤 활동을 하셨나요?</h2>
            <div className="grid grid-cols-3 gap-4">
              {activities.map((act, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center p-2 bg-gray-800 rounded-lg transform transition-transform hover:scale-105"
                >
                  <span className="text-4xl mb-2">{act.emoji}</span>
                  <span className="text-sm text-white">{act.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Link href="/writewritewritewrite">
            <div className="mt-6 block w-full py-3 bg-purple-600 rounded-full text-center font-semibold">
              다음
            </div>
          </Link>
        </Column>
      </Container>
    </App>
  )
}
