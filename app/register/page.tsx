'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import App from '@/shared/layout/App';
import Container from '@/shared/layout/Container';
import Header from '@/shared/component/Header';
import Column from '@/shared/layout/Column';
import SubTitle from '@/shared/component/SubTitle';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
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

  const handleRegister = async () => {
    // 입력 검증
    if (!formData.username || !formData.password) {
      setMessage('아이디와 비밀번호는 필수입니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.password.length < 6) {
      setMessage('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        setTimeout(() => {
          router.push('/login');
        }, 500);
      } else {
        setMessage(data.error || '회원가입에 실패했습니다.');
      }
    } catch (_) {
      setMessage(_+'서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <App>
      <Container>
        <Header title="회원가입" />
        
        <Column className="flex-1 justify-between p-4">
          <div className="space-y-6">
            <SubTitle>새 계정 만들기</SubTitle>
            
            <div className="space-y-4">
              {/* 아이디 */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  아이디 *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="아이디를 입력하세요"
                  className="w-full p-3 bg-neutral-800 rounded-lg border border-neutral-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  비밀번호 *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력하세요 (6자 이상)"
                  className="w-full p-3 bg-neutral-800 rounded-lg border border-neutral-600 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  비밀번호 확인 *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="w-full p-3 bg-neutral-800 rounded-lg border border-neutral-600 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            {/* 메시지 표시 */}
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('완료') 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-red-900 text-red-300'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* 버튼들 */}
            <button 
              onClick={handleRegister}
              disabled={isLoading}
            >
              <div className="mt-[2rem] flex justify-center items-center w-full h-[3.25rem] bg-purple-600 text-[1.125rem] text-white rounded-4xl font-[500] duration-200 hover:bg-purple-500" >
                {isLoading ? '처리 중...' : '회원가입'}
              </div>
            </button>
            <Link 
              href="/register"
            >
              <div className="flex justify-center items-center w-full h-[2.5rem] text-white rounded-4xl duration-200 text-[0.875rem]" >
                이미 계정이 있으신가요? 로그인
              </div>
            </Link>
        </Column>
      </Container>
    </App>
  );
}