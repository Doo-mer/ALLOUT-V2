import React from 'react';
import Link from 'next/link';

export interface PrimaryButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  href,
  children,
  className = '',
  onClick,
  disabled = false,
  type = "button"
}) => {
  const baseClass = `flex justify-center items-center w-full h-[3.25rem] bg-purple-600 text-[1.125rem] text-white rounded-4xl font-[500] duration-200 hover:bg-purple-500 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`.trim();

  if (href && !onClick) {
    return (
      <div className="mx-[2rem] mb-[2rem]">
        <a href={disabled ? undefined : href}>
          <div className={baseClass}>
            {children}
          </div>
        </a>
      </div>
    );
  }
  return (
    <div className="mx-[2rem] mb-[2rem]">
      <button
        type={type}
        className={baseClass}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default PrimaryButton;
