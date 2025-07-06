"use client"

import App from '@/shared/layout/App'
import Container from '@/shared/layout/Container'
import Column from '@/shared/layout/Column'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Header from '@/shared/component/Header'
import { useAtom } from 'jotai'
import { userAtom } from '@/shared/store/userStore'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ReportPage() {
  const [user] = useAtom(userAtom);
  const userId = user?.id;

  const { data, isLoading } = useSWR(
    userId ? `/api/users/summary?userId=${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      fallbackData: { emotionStats: [], activityStats: [] },
    }
  );

  const emotionData = data?.emotionStats || [];
  const activityData = data?.activityStats || [];

  return (
    <App>
      <Container className="min-h-screen flex flex-col bg-black text-white">
        <Header title="분석보고서" />

        <Column className="flex-1 px-6 py-4 space-y-10">
          <section>
            <h2 className="text-lg font-bold mb-3">감정 종류</h2>
            <div className="bg-[#1c1c1e] rounded-2xl p-4 shadow-md">
              {isLoading ? (
                <div className="flex justify-center items-center h-44">
                  <div className="w-full flex flex-col gap-4 animate-pulse">
                    <div className="h-6 w-1/3 bg-neutral-700 rounded mx-auto" />
                    <div className="h-32 w-full bg-neutral-800 rounded" />
                  </div>
                </div>
              ) : emotionData.length === 0 ? (
                <div className="flex justify-center items-center h-44">
                  <div className="text-neutral-400">감정 데이터가 없습니다.</div>
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
              {isLoading ? (
                <div className="flex justify-center items-center h-44">
                  <div className="w-full flex flex-col gap-4 animate-pulse">
                    <div className="h-6 w-1/3 bg-neutral-700 rounded mx-auto" />
                    <div className="h-32 w-full bg-neutral-800 rounded" />
                  </div>
                </div>
              ) : activityData.length === 0 ? (
                <div className="flex justify-center items-center h-44">
                  <div className="text-neutral-400">활동 데이터가 없습니다.</div>
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