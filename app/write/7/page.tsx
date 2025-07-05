'use client'

import Link from 'next/link'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Column from '@/shared/layout/Column'
import PrimaryButton from '@/shared/component/PrimaryButton'

export default function CompletePage() {
  return (
    <App>
      <Container>
        <Column className="flex-1 justify-center items-center h-[90%]">
          {/* Celebration Emoji */}
          <div className="text-8xl mb-[2rem]">
            🎉
          </div>

          {/* Title */}
          <div className="text-4xl font-bold mb-[0.5rem]">축하해요!</div>

          {/* Subtitle */}
          <div className="text-gray-300 text-lg">일기를 모두 작성했어요</div>
        </Column>
        <PrimaryButton href='/home'>홈으로</PrimaryButton>
      </Container>
    </App>
  )
}
