'use client'

import { useAtom } from 'jotai';
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Header from '@/shared/component/Header'
import Column from '@/shared/layout/Column'
import SubTitle from '@/shared/component/SubTitle'
import PrimaryButton from '@/shared/component/PrimaryButton';
import { alternativeThoughtsAtom } from '@/shared/store/diaryStore';

export default function AlternativeThoughtsPage() {
  const [thoughts, setThoughts] = useAtom(alternativeThoughtsAtom);

  return (
    <App>
      <Container>
        <Header title='일기'/>

        <Column className="flex-1 justify-between p-4">
          {/* Prompt */}
          <div className="space-y-4  mb-[1rem]">
            <SubTitle>더 현실적이고 균형잡힌 생각은 무엇일까요?</SubTitle>

            {/* Textarea for alternative thoughts */}
            <textarea
              value={thoughts}
              onChange={e => setThoughts(e.target.value)}
              placeholder="더 현실적이고 균형잡힌 생각을 적어보세요..."
              className="w-full h-40 p-3 bg-gray-800 rounded-lg resize-none focus:outline-none"
            />
          </div>

          {/* Next Button */}
          <PrimaryButton href="/write/7">다음</PrimaryButton>
        </Column>
      </Container>
    </App>
  )
}
