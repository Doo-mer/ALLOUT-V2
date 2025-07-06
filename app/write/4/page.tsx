'use client'

import { useAtom } from 'jotai';
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Header from '@/shared/component/Header'
import Column from '@/shared/layout/Column'
import PrimaryButton from '@/shared/component/PrimaryButton';
import { contentAtom } from '@/shared/store/diaryStore';

export default function DetailPage() {
  const [text, setText] = useAtom(contentAtom);

  return (
    <App>
      <Container>
        {/* Header with back button */}
        <Header title='일기'/>

        <Column className="flex-1 justify-between p-4">
         

          {/* Prompt + Textarea */}
          <div className="space-y-2 mb-[1rem]">
            <p className="text-lg">고민에 대해 자세히 알려주세요</p>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="여기에 작성하세요..."
              className="w-full h-40 p-3 bg-gray-900 rounded-lg resize-none focus:outline-none"
            />
          </div>

          {/* Next Button */}
          <PrimaryButton href="/write/5">다음</PrimaryButton>
        </Column>
      </Container>
    </App>
  )
}