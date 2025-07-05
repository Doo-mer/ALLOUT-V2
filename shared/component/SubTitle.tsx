'use client'
import React from 'react'

interface SubTitleProps {
  children: React.ReactNode
}

export default function SubTitle({ children }: SubTitleProps) {
  return (
    <div className="text-[1.25rem]">
      {children}
    </div>
  )
}
