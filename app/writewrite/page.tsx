"use client"

import { useState } from 'react';
import Link from 'next/link';
import App from '@/shared/layout/App';
import Container from '@/shared/layout/Container';
import Header from '@/shared/component/Header';
import Column from '@/shared/layout/Column';

const tabs = [
    { key: 'negative', label: '부정적' },
    { key: 'positive', label: '긍정적' },
];

const emotions = {
    negative: [
        { emoji: '😠', label: '짜증스럽다' },
        { emoji: '😰', label: '불안하다' },
        { emoji: '🙁', label: '실망스럽다' },
        { emoji: '😶‍🌫️', label: '공허하다' },
        { emoji: '😣', label: '불만스럽다' },
        { emoji: '😔', label: '죄책감이 든다' },
        { emoji: '😞', label: '희망이 없다' },
        { emoji: '😔', label: '외롭다' },
        { emoji: '😬', label: '긴장된다' },
        { emoji: '😵', label: '감정에 압도된다' },
        { emoji: '😢', label: '슬프다' },
        { emoji: '🤦‍♀️', label: '스트레스 받는다' },
        { emoji: '😴', label: '피곤하다' },
        { emoji: '🤔', label: '걱정된다' },
        { emoji: '🔒', label: '사용자화' },
    ],
    positive: [
        { emoji: '😀', label: '행복하다' },
        { emoji: '😊', label: '기쁘다' },
        { emoji: '😁', label: '즐겁다' },
        { emoji: '😃', label: '신난다' },
        { emoji: '🙂', label: '편안하다' },
        { emoji: '😇', label: '평화롭다' },
        { emoji: '🤗', label: '따뜻하다' },
        { emoji: '😎', label: '자신감 있다' },
        { emoji: '🤩', label: '설렌다' },
        { emoji: '💪', label: '힘이 난다' },
        { emoji: '🥳', label: '파티하고 싶다' },
        { emoji: '🎉', label: '축하받고 싶다' },
        { emoji: '🌈', label: '희망적이다' },
        { emoji: '🌞', label: '밝다' },
        { emoji: '✨', label: '반짝인다' },
    ],
};

export default function DiaryPage() {
    const [activeTab, setActiveTab] = useState('negative');

    return (
        <App>
            <Container>
                <Header title="일기" />

                {/* Content */}
                <Column className="flex-1 justify-between p-4">
                    <div className="space-y-4">
                        <h2 className="text-lg">어떤 감정을 느끼고 계신가요?</h2>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-600">
                            {tabs.map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-1 text-center ${activeTab === tab.key ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Grid of emotions */}
                        <div className="grid grid-cols-3 gap-4">
                            {emotions[activeTab].map((item, idx) => (
                                <button
                                    key={idx}
                                    className="flex flex-col items-center p-2 bg-gray-800 rounded-lg transform transition-transform hover:scale-105"
                                >
                                    <span className="text-4xl mb-2">{item.emoji}</span>
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Next Button */}
                    <Link href="/writewritewrite">
                        <div className="mt-6 block w-full py-3 bg-purple-600 rounded-full text-center font-semibold">
                            다음
                        </div>
                    </Link>
                </Column>
            </Container>
        </App>
    );
}
