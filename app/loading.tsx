// src/app/loading.tsx
'use client';
import App from "@/shared/layout/App";
import Container from "@/shared/layout/Container";


export default function Loading() {

  return (
    <App>
      <Container className="flex justify-center items-start">
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-purple-600 animate-[loadingBar_1.5s_infinite]"></div>
        </div>

        <style jsx>{`
        @keyframes loadingBar {
          0%  { transform: translateX(-100%); }  
          100% { transform: translateX(0%); }
        }
      `}</style>
      </Container>
    </App>
  );
}
