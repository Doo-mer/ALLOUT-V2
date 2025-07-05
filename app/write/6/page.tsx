'use client'

import { useState } from 'react'
import Link from 'next/link'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Column from '@/shared/layout/Column'
import Header from '@/shared/component/Header'
import SubTitle from '@/shared/component/SubTitle'

const distortions = [
  { key: '최악', title: '상황을 최악으로 인식하기' },
  { key: '이분법', title: '이분법적 사고' },
  { key: '감정추론', title: '감정적 추론' },
  // …필요한 만큼 더…
]

export default function ReframePage({ selectedDistortions = ['최악', '이분법', '감정추론'] }) {
  const [example, setExample] = useState('아 연락이 안돼네, 헤어져야겠다')
  const [reframeText, setReframeText] = useState('')

  return (
    <App>
      <Container>
        <Header title='일기'/>

        <Column className="flex-1 justify-between p-4 space-y-4">
          {/* Prompt */}
          <SubTitle>그 생각을 어떻게 바꿀 수 있을까요?</SubTitle>

          {/* Example input (readonly) */}
          <input
            type="text"
            value={example}
            readOnly
            className="w-full p-3 bg-gray-800 rounded-lg text-gray-300"
          />

          {/* Selected distortions as scrollable chips */}
          <div className="flex space-x-2 overflow-x-auto py-1">
            {selectedDistortions.map((key) => {
              const item = distortions.find(d => d.key === key)
              return (
                <div
                  key={key}
                  className="flex-shrink-0 px-4 py-2 bg-purple-600 rounded-full text-white whitespace-nowrap"
                >
                  {item?.title || key}
                </div>
              )
            })}
          </div>

          {/* Reframe textarea */}
          <textarea
            value={reframeText}
            onChange={e => setReframeText(e.target.value)}
            placeholder="새로운 관점으로 생각을 적어보세요..."
            className="w-full h-48 p-3 bg-gray-800 rounded-lg resize-none focus:outline-none"
          />

          {/* Next Button */}
          <Link
            href="/write/7"
            className="block w-full py-3 bg-purple-600 rounded-full text-center font-semibold mt-4"
          >
            다음
          </Link>
        </Column>
      </Container>
    </App>
  )
}
