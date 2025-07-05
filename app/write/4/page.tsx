'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Header from '@/shared/component/Header'
import Column from '@/shared/layout/Column'
import getCaretCoordinates from 'textarea-caret'

// DetailPageInteractive.tsx
export default function DetailPage() {
  const [text, setText] = useState<string>('')
  const [caretPos, setCaretPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const updateCaret = () => {
      const ta = textareaRef.current
      if (!ta) return
      const pos = ta.selectionEnd
      const coords = getCaretCoordinates(ta, pos)
      const rect = ta.getBoundingClientRect()
      setCaretPos({
        x: coords.left + rect.left,
        y: coords.top + rect.top,
      })
    }
    const ta = textareaRef.current
    ta?.addEventListener('input', updateCaret)
    ta?.addEventListener('click', updateCaret)
    ta?.addEventListener('keyup', updateCaret)
    return () => {
      ta?.removeEventListener('input', updateCaret)
      ta?.removeEventListener('click', updateCaret)
      ta?.removeEventListener('keyup', updateCaret)
    }
  }, [])

  // pupil movement within eye socket, clamp values
  const pupilOffset = (axis: 'x' | 'y') => {
    if (!textareaRef.current) return 0
    const eyeRadius = 8 // pupil movement radius
    const eyeRect = textareaRef.current.getBoundingClientRect()
    const relative = axis === 'x' ? caretPos.x - (eyeRect.left + eyeRect.width / 2) : caretPos.y - (eyeRect.top + 20)
    return Math.max(-eyeRadius, Math.min(eyeRadius, relative / 20))
  }

  return (
    <App>
      <Container className="relative">
        <Header title="일기" />
        <Column className="flex-1 justify-between p-4 relative">
          {/* Avatar head fixed */}
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center">
            {/* Left eye */}
            <div className="relative w-6 h-6 bg-black rounded-full overflow-hidden ml-2">
              <div
                className="w-2 h-2 bg-white rounded-full absolute"
                style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%) translate(${pupilOffset('x')}px, ${pupilOffset('y')}px)` }}
              />
            </div>
            {/* Right eye */}
            <div className="relative w-6 h-6 bg-black rounded-full overflow-hidden ml-2">
              <div
                className="w-2 h-2 bg-white rounded-full absolute"
                style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%) translate(${pupilOffset('x')}px, ${pupilOffset('y')}px)` }}
              />
            </div>
          </div>

          {/* Textarea */}
          <div className="mt-40 space-y-2">
            <p className="text-lg">고민에 대해 자세히 알려주세요</p>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="여기에 작성하세요..."
              className="w-full h-40 p-3 pt-6 bg-gray-800 rounded-lg resize-none focus:outline-none text-white"
            />
          </div>

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
