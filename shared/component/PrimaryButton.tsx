import React from 'react';
import Link from 'next/link';

export interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ href, children, className = '' }) => {
  return (
    <div className="mx-[2rem] mb-[2rem]">
      <Link href={href}>
        <div
          className={`flex justify-center items-center w-full h-[3.25rem] bg-purple-600 text-[1.125rem] text-white rounded-4xl font-[500] duration-200 hover:bg-purple-500 ${className}`.trim()}
        >
          {children}
        </div>
      </Link>
    </div>
  );
};

export default PrimaryButton;
