"use client"

import { useEffect, useState } from 'react'
import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Column from '@/shared/layout/Column'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Header from '@/shared/component/Header'

interface Diary {
  id: string;
  emotions: string[];
  activities: string[];
  createdAt: string;
}

interface ChartData {
  name: string;
  value: number;
}

export default function ReportPage() {
  const [emotionData, setEmotionData] = useState<ChartData[]>([]);
  const [activityData, setActivityData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiaryData = async () => {
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
          const diaries: Diary[] = data.diaries || [];
          
          // 감정 데이터 분석
          const emotionCounts: { [key: string]: number } = {};
          diaries.forEach(diary => {
            diary.emotions.forEach(emotion => {
              emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
            });
          });
          
          const emotionChartData = Object.entries(emotionCounts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // 상위 5개만 표시
          
          setEmotionData(emotionChartData);

          // 활동 데이터 분석
          const activityCounts: { [key: string]: number } = {};
          diaries.forEach(diary => {
            diary.activities.forEach(activity => {
              activityCounts[activity] = (activityCounts[activity] || 0) + 1;
            });
          });
          
          const activityChartData = Object.entries(activityCounts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // 상위 5개만 표시
          
          setActivityData(activityChartData);
        }
      } catch (error) {
        console.error('Error fetching diary data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryData();
  }, []);

  return (
    <App>
      <Container className="min-h-screen flex flex-col bg-black text-white">
        <Header title="분석보고서" />

        <Column className="flex-1 px-6 py-4 space-y-10">
          <section>
            <h2 className="text-lg font-bold mb-3">감정 종류</h2>
            <div className="bg-[#1c1c1e] rounded-2xl p-4 shadow-md">
              {loading ? (
                <div className="flex justify-center items-center h-44">
                  <div className="text-gray-400">로딩 중...</div>
                </div>
              ) : emotionData.length === 0 ? (
                <div className="flex justify-center items-center h-44">
                  <div className="text-gray-400">감정 데이터가 없습니다.</div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={emotionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2e" />
                    <XAxis dataKey="name" stroke="#bbb" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#bbb" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: 10 }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#a855f7" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3">활동 종류</h2>
            <div className="bg-[#1c1c1e] rounded-2xl p-4 shadow-md">
              {loading ? (
                <div className="flex justify-center items-center h-44">
                  <div className="text-gray-400">로딩 중...</div>
                </div>
              ) : activityData.length === 0 ? (
                <div className="flex justify-center items-center h-44">
                  <div className="text-gray-400">활동 데이터가 없습니다.</div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2c2c2e" />
                    <XAxis dataKey="name" stroke="#bbb" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#bbb" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: 10 }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} />
                    <Bar dataKey="value" fill="#7c3aed" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>
        </Column>
      </Container>
    </App>
  )
}