'use client';

import { useRouter } from 'next/navigation';

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="flex items-center justify-between bg-black p-2 text-white">
      <button onClick={handleBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 className="text-md font-semibold">{title}</h1>
      <div className="w-6" />
    </header>
  );
}