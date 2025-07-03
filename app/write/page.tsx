'use client';

import Header from "@/shared/component/Header";
import App from "@/shared/layout/App";
import Container from "@/shared/layout/Container";
import Column from "@/shared/layout/Column";
import Row from "@/shared/layout/Row";
import PrimaryButton from "@/shared/component/PrimaryButton";

export default function DiaryPage() {
    return (
        <App>
            <Container className="flex flex-col justify-between">
                <Header title="일기" />
                <Column>
                    <Column className="mx-auto gap-[2rem]">
                        <span className="text-[1.25rem] text-white">기분이 어떠신가요?</span>
                        <Row className="flex space-x-2">
                            <button className="transform text-5xl transition-transform hover:scale-110">😭</button>
                            <button className="transform text-5xl transition-transform hover:scale-110">😥</button>
                            <button className="transform text-5xl transition-transform hover:scale-110">😐</button>
                            <button className="transform text-5xl transition-transform hover:scale-110">😊</button>
                            <button className="transform text-5xl transition-transform hover:scale-110">😆</button>
                        </Row>
                    </Column>
                </Column>
                <PrimaryButton href="/writewrite">다음</PrimaryButton>
            </Container>
        </App>
    );
}