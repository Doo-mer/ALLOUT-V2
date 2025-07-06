// src/shared/component/Loading.tsx
import React from 'react';

const Loading: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    {/* 간단한 바 형태 로더 */}
    <div className="w-2/3 h-1 bg-neutral-300 rounded-full overflow-hidden">
      <div className="h-full bg-purple-600 animate-[loadingBar_1.5s_infinite]"></div>
    </div>
    <style jsx>{`
      @keyframes loadingBar {
        0%   { transform: translateX(-100%); }
        50%  { transform: translateX(0%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  </div>
);

export default Loading;
