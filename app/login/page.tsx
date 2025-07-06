'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import App from '@/shared/layout/App';
import Container from '@/shared/layout/Container';
import Header from '@/shared/component/Header';
import Column from '@/shared/layout/Column';
import SubTitle from '@/shared/component/SubTitle';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      setMessage('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('로그인 성공! 홈으로 이동합니다.');
        setTimeout(() => {
          router.push('/home');
        }, 500);
      } else {
        setMessage(data.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      setMessage('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <App>
      <Container>
        <Header title="로그인" />
        <Column className="flex-1 justify-between p-4">
          <div className="space-y-6">
            <SubTitle>계정에 로그인</SubTitle>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">아이디</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="아이디를 입력하세요"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('성공')
                  ? 'bg-green-900 text-green-300'
                  : 'bg-red-900 text-red-300'
              }`}>
                {message}
              </div>
            )}
          </div>
            <button onClick={handleLogin} disabled={isLoading} className='mt-[2rem]'>
              <div className="flex justify-center items-center w-full h-[3.25rem] bg-purple-600 text-[1.125rem] text-white rounded-4xl font-[500] duration-200 hover:bg-purple-500">
                {isLoading ? '로그인 중...' : '로그인'}
              </div>
            </button>
            <Link href="/register">
              <div className="flex justify-center items-center w-full h-[2.5rem] text-white rounded-4xl duration-200 text-[0.875rem]">
                계정이 없으신가요? 회원가입
              </div>
            </Link>
        </Column>
      </Container>
    </App>
  );
}
