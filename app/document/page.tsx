"use client"

import { useEffect, useState } from 'react'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Column from '@/shared/layout/Column'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Header from '@/shared/component/Header'

const emotionData = [
  { name: '불안', value: 12 },
  { name: '슬픔', value: 8 },
  { name: '짜증', value: 5 },
  { name: '외로움', value: 4 },
  { name: '기쁨', value: 3 },
]

const activityData = [
  { name: '운동', value: 9 },
  { name: '게임', value: 7 },
  { name: '영상 시청', value: 6 },
  { name: '산책', value: 5 },
  { name: '대화', value: 4 },
]

export default function ReportPage() {
  return (
    <App>
      <Container className="min-h-screen flex flex-col bg-black text-white">
        <Header title="분석보고서" />

        <Column className="flex-1 px-6 py-4 space-y-10">
          <section>
            <h2 className="text-lg font-bold mb-3">감정 종류</h2>
            <div className="bg-[#1c1c1e] rounded-2xl p-4 shadow-md">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={emotionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2e" />
                  <XAxis dataKey="name" stroke="#bbb" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#bbb" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: 10 }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} />
                  <Bar dataKey="value" fill="#a855f7" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">활동 종류</h2>
            <div className="bg-[#1c1c1e] rounded-2xl p-4 shadow-md">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2e" />
                  <XAxis dataKey="name" stroke="#bbb" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#bbb" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: 10 }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} />
                  <Bar dataKey="value" fill="#7c3aed" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </Column>
      </Container>
    </App>
  )
}