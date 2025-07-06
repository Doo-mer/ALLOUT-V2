'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Column from '@/shared/layout/Column'
import Header from '@/shared/component/Header'

interface DiaryEntry {
  id: string;
  content: string;
  createdAt: string;
  mood?: string;
}

const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

export default function GominListPage() {
  const [selectedMonth, setSelectedMonth] = useState('7월')
  const [monthSelectorOpen, setMonthSelectorOpen] = useState(false)
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        const response = await fetch(`/api/diary?authorId=${user.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setDiaryEntries(data.diaries || []);
        }
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryEntries();
  }, []);

  // 선택된 월에 해당하는 일기만 필터링
  const getCurrentMonthNumber = () => {
    const monthIndex = months.indexOf(selectedMonth);
    return monthIndex + 1; // 1부터 12까지
  };

  const filteredEntries = diaryEntries.filter(entry => {
    const entryDate = new Date(entry.createdAt);
    return entryDate.getMonth() + 1 === getCurrentMonthNumber();
  });

  // 일기 내용에서 제목 추출 (첫 번째 줄 또는 첫 30자)
  const getTitleFromContent = (content: string) => {
    const firstLine = content.split('\n')[0];
    return firstLine.length > 30 ? firstLine.substring(0, 30) + '...' : firstLine;
  };

  // 날짜와 요일 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return { day, weekday };
  };

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
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-400">로딩 중...</div>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-400">{selectedMonth}에 작성된 일기가 없습니다.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredEntries.map((entry) => {
                const { day, weekday } = formatDate(entry.createdAt);
                const title = getTitleFromContent(entry.content);
                
                return (
                  <div key={entry.id} className="bg-[#1e1e1e] rounded-xl p-3 shadow-md">
                    <div className="text-xs text-gray-400 mb-1">{day}일 ({weekday})</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <div className="text-sm font-semibold truncate w-full">{title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </App>
  )
}