'use client';

import dynamic from 'next/dynamic';
import Column from '../shared/layout/Column';
import Loading from './loading';
import Container from '@/shared/layout/Container';
import InteractivePolygon from '@/shared/component/InteractivePolygon';
import Link from 'next/link';

// static import가 아니라 dynamic으로 로드!
// - ssr: false 로 클라이언트 전용으로만 로드
// - loading: <Loading /> 렌더링 옵션

const App = dynamic(
  () => import('@/shared/layout/App'),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function Home() {
  return (
    <App>
      <Container>
        <Column className="h-full justify-between">
          {/* 헤더 */}
          <div className="mx-auto text-center mt-[5rem]">
            <div className="text-white text-[3.5rem] font-rix mb-[-0.5rem]">
              ALL OUT
            </div>
            <div className="text-white text-[1.125rem]">
              잠들기 전 마음을 털어놓는 시간
            </div>
          </div>

          {/* 이 자리에 인터랙티브 컴포넌트 대신,
              모듈이 로드될 때까지 Loading이 뜹니다 */}
          <div className="h-[320px] flex items-center justify-center">
            <InteractivePolygon />
          </div>
          
          {/* 버튼 */}
          <div className="mx-[2rem] mb-[2rem]">
            <Link 
              href="/home"
            >
              <div className="flex justify-center items-center w-full h-[3.25rem] bg-purple-600 text-[1.125rem] text-white rounded-4xl font-[500] duration-200 hover:bg-purple-500" >
                시작
              </div>
            </Link>
          </div>
        </Column>
      </Container>
    </App>
  );
}
