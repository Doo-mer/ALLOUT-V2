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
        <Header title='일기'/>

        <Column className="flex-1 justify-between p-4">
        

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
          <Link href="/write/5">
            <div className="block w-full py-3 mt-6 bg-purple-600 rounded-full text-center font-semibold">
              다음
            </div>
          </Link>
        </Column>
      </Container>
    </App>
  )
}