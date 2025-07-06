'use client';

import { useState } from 'react';
import Header from "@/shared/component/Header";
import App from "@/shared/layout/App";
import Container from "@/shared/layout/Container";
import Column from "@/shared/layout/Column";
import Row from "@/shared/layout/Row";
import PrimaryButton from "@/shared/component/PrimaryButton";
import SubTitle from "@/shared/component/SubTitle"
import { useAtom } from 'jotai';
import { moodAtom } from '@/shared/store/diaryStore';

const emotions = [
    { emoji: '😭', label: '매우 슬픔' },
    { emoji: '😥', label: '슬픔' },
    { emoji: '😐', label: '보통' },
    { emoji: '😊', label: '좋음' },
    { emoji: '😆', label: '매우 좋음' },
];

export default function DiaryPage() {
    const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
    const [mood, setMood] = useAtom(moodAtom);

    return (
        <App>
            <Container className="flex flex-col justify-between">
                <Header title="일기" />
                <Column>
                    <Column className="mx-auto gap-[2rem]">
                        <SubTitle>기분이 어떠신가요?</SubTitle>
                        <Row className="flex space-x-2">
                            {emotions.map((emotion, idx) => (
                                <div 
                                    key={idx}
                                    className={`w-16 h-16 flex items-center justify-center rounded-lg box-border ${
                                        selectedEmotion === emotion.label ? 'border-2 border-purple-500 bg-purple-800' : 'border-2 border-transparent'
                                    }`}
                                >
                                    <button 
                                        onClick={() => {
                                            setSelectedEmotion(emotion.label);
                                            setMood(emotion.label);
                                            console.log(emotion.label)
                                        }}
                                        className="transform text-5xl transition-transform hover:scale-110"
                                    >
                                        {emotion.emoji}
                                    </button>
                                </div>
                            ))}
                        </Row>
                    </Column>
                </Column>
                <PrimaryButton href="/write/2" disabled={!mood}>다음</PrimaryButton>
            </Container>
        </App>
    );
}