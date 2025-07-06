import { useAtom, useSetAtom } from 'jotai';
import useSWR from 'swr';
import { 
  userAtom, 
  userStatsAtom, 
  userDiariesAtom, 
  loadingAtom,
  updateUserStatsAtom,
  updateUserDiariesAtom,
  setLoadingAtom,
  User,
  UserStats,
  Diary
} from '@/shared/store/userStore';

// SWR fetcher 함수들
const fetcher = (url: string) => fetch(url).then(res => res.json());

const fetchUserStats = async (userId: string): Promise<UserStats> => {
  const response = await fetch(`/api/users/stats?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user stats');
  }
  return response.json();
};

const fetchUserDiaries = async (userId: string): Promise<{ diaries: Diary[] }> => {
  const response = await fetch(`/api/diary?authorId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user diaries');
  }
  return response.json();
};

export const useUserData = () => {
  const [user] = useAtom(userAtom);
  const [userStats, setUserStats] = useAtom(userStatsAtom);
  const [userDiaries, setUserDiaries] = useAtom(userDiariesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const updateStats = useSetAtom(updateUserStatsAtom);
  const updateDiaries = useSetAtom(updateUserDiariesAtom);
  const setLoadingState = useSetAtom(setLoadingAtom);

  // 사용자 통계 SWR
  const { 
    data: statsData, 
    error: statsError, 
    mutate: mutateStats,
    isLoading: statsLoading 
  } = useSWR(
    user ? `/api/users/stats?userId=${user.id}` : null,
    () => user ? fetchUserStats(user.id) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0, // 자동 새로고침 비활성화
      onSuccess: (data) => {
        if (data) {
          updateStats(data);
        }
      },
      onError: (error) => {
        console.error('Error fetching user stats:', error);
      }
    }
  );

  // 사용자 일기 목록 SWR
  const { 
    data: diariesData, 
    error: diariesError, 
    mutate: mutateDiaries,
    isLoading: diariesLoading 
  } = useSWR(
    user ? `/api/diary?authorId=${user.id}` : null,
    () => user ? fetchUserDiaries(user.id) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0, // 자동 새로고침 비활성화
      onSuccess: (data) => {
        if (data) {
          updateDiaries(data.diaries || []);
        }
      },
      onError: (error) => {
        console.error('Error fetching user diaries:', error);
      }
    }
  );

  // 로딩 상태 계산 - 사용자가 없으면 로딩하지 않음
  const isLoading = user ? (statsLoading || diariesLoading) : false;

  // 데이터 새로고침 함수
  const refreshData = async () => {
    if (user) {
      await Promise.all([
        mutateStats(),
        mutateDiaries()
      ]);
    }
  };

  // 새 일기 추가 후 데이터 새로고침
  const addDiaryAndRefresh = async (newDiary: Diary) => {
    // 먼저 로컬 상태에 추가 (즉시 UI 업데이트)
    setUserDiaries([newDiary, ...userDiaries]);
    
    // 서버에서 최신 데이터 가져오기
    await refreshData();
  };

  return {
    user,
    userStats: userStats || statsData,
    userDiaries: userDiaries || (diariesData?.diaries || []),
    loading: isLoading,
    error: statsError || diariesError,
    refreshData,
    addDiaryAndRefresh,
    mutateStats,
    mutateDiaries
  };
};

// 사용자 설정 훅
export const useUserSettings = () => {
  const [user, setUser] = useAtom(userAtom);
  const setLoadingState = useSetAtom(setLoadingAtom);

  const login = async (username: string, password: string) => {
    setLoadingState(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: '로그인 중 오류가 발생했습니다.' };
    } finally {
      setLoadingState(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (username: string, password: string) => {
    setLoadingState(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: '회원가입 중 오류가 발생했습니다.' };
    } finally {
      setLoadingState(false);
    }
  };

  return {
    user,
    login,
    logout,
    register
  };
}; 