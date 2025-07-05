'use client'

import { useState } from 'react'
import Link from 'next/link'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Header from '@/shared/component/Header'
import Column from '@/shared/layout/Column'
import SubTitle from '@/shared/component/SubTitle'

const distortions = [
  {
    icon: '💣',
    title: '최악으로 인식하기',
    subtitle: '최악의 상황이 일어나면 어떡하지?'
  },
  {
    icon: '☯️',
    title: '이분법적 사고',
    subtitle: '나는 완전 실패자야'
  },
  {
    icon: '🤔',
    title: '감정적 추론',
    subtitle: '내가 이렇게 느끼고 있으니까 이게 사실일 거야'
  },
  {
    icon: '⛔',
    title: '부정적 확대 해석',
    subtitle: '나는 제대로 잘 하는 게 하나도 없어'
  },
  {
    icon: '+',
    title: '긍정적인 상황 최소화하기',
    subtitle: '그냥 하는 말이겠지 뭐'
  },
  {
    icon: '🦕',
    title: '바로 결론으로 넘어가기',
    subtitle: '나를 싫어해서 인사조차 안 한 거겠지'
  },
  // 필요하다면 더 추가…
]

export default function DistortionPage() {
  const [example, setExample] = useState('아 연락이 안돼네, 헤어져야겠다')
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <App>
      <Container>
        {/* Header */}
        <Header title='일기'/>

        <Column className="flex-1 justify-between p-4">
          {/* Prompt */}
          <div className="space-y-4">
            <SubTitle>생각 속에 실제와 다르게 왜곡된 점이 포함되어 있나요?</SubTitle>

            {/* Example input box */}
            <div className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none">
              {example}
            </div>
             

            {/* Scrollable list */}
            <div className="max-h-[26rem] overflow-y-auto space-y-2">
              {distortions.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`flex items-start gap-3 w-full p-4 rounded-lg transition-transform box-border
                    ${selected === idx ? 'bg-purple-600 text-white border-2 border-purple-500' : 'bg-gray-800 text-gray-100 border-2 border-transparent'}
                  `}
                >
                  <span className="text-2xl">{d.icon}</span>
                  <div className="text-left">
                    <p className="font-medium">{d.title}</p>
                    <p className="text-sm text-gray-400">{d.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <Link
            href="/write/6"
            className="block w-full py-3 mt-6 bg-purple-600 rounded-full text-center font-semibold"
          >
            다음
          </Link>
        </Column>
      </Container>
    </App>
  )
}
