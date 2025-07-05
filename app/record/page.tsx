'use client'

import Link from 'next/link'
import { useState } from 'react'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Column from '@/shared/layout/Column'
import Header from '@/shared/component/Header'

const dummyEntries = Array(30).fill({
  day: 6,
  weekday: '월',
  title: '오늘 남친이랑 헤어져서 너무 힘들어...'
})

const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

export default function GominListPage() {
  const [selectedMonth, setSelectedMonth] = useState('7월')
  const [monthSelectorOpen, setMonthSelectorOpen] = useState(false)

  return (
    <App>
      <Container className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <Header title='고민 기록'/>

        {/* Month Selector */}
        <div className="px-4 pt-4 text-lg font-semibold relative">
          <button onClick={() => setMonthSelectorOpen(prev => !prev)}>{selectedMonth}</button>
          {monthSelectorOpen && (
            <div className="absolute mt-2 bg-[#1e1e1e] rounded-lg shadow-lg z-10 w-28">
              {months.map(month => (
                <div
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month)
                    setMonthSelectorOpen(false)
                  }}
                  className="px-3 py-2 text-sm hover:bg-purple-600 rounded cursor-pointer"
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Grid of Entries */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            {dummyEntries.map((entry, idx) => (
              <div key={idx} className="bg-[#1e1e1e] rounded-xl p-3 shadow-md">
                <div className="text-xs text-gray-400 mb-1">{entry.day}일 ({entry.weekday})</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <div className="text-sm font-semibold truncate w-full">{entry.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </App>
  )
}