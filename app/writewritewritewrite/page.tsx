'use client'

import { useState } from 'react'
import Link from 'next/link'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Header from '@/shared/component/Header'
import Column from '@/shared/layout/Column'

export default function DetailPage() {
  const [text, setText] = useState('')

  return (
    <App>
      <Container>
        {/* Header with back button */}
        <div className="flex items-center h-12">
          <Link href="/previous-step">
            <div className="text-2xl mr-2">〈</div>
          </Link>
          <h1 className="text-xl font-bold">일기</h1>
        </div>

        <Column className="flex-1 justify-between p-4">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full mx-2" />
            </div>
          </div>

          {/* Prompt + Textarea */}
          <div className="space-y-2">
            <p className="text-lg">고민에 대해 자세히 알려주세요</p>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="여기에 작성하세요..."
              className="w-full h-40 p-3 bg-gray-800 rounded-lg resize-none focus:outline-none"
            />
          </div>

          {/* Next Button */}
          <Link href="/write-complete">
            <div className="block w-full py-3 mt-6 bg-purple-600 rounded-full text-center font-semibold">
              다음
            </div>
          </Link>
        </Column>
      </Container>
    </App>
  )
}
