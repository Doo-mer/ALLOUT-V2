import { atom } from 'jotai';

export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface UserStats {
  userId: string;
  consecutiveDays: number;
  recentTwentyDaysCount: number;
  totalDiaries: number;
}

export interface Diary {
  id: string;
  content: string;
  mood?: string;
  emotions: string[];
  activities: string[];
  distortions: number[];
  alternativeThoughts?: string;
  moodChange?: string;
  createdAt: string;
  authorId: string;
}

// 사용자 정보 atom
export const userAtom = atom<User | null>(null);

// 사용자 통계 atom
export const userStatsAtom = atom<UserStats | null>(null);

// 사용자 일기 목록 atom
export const userDiariesAtom = atom<Diary[]>([]);

// 로딩 상태 atom
export const loadingAtom = atom<boolean>(false);

// 사용자 설정 atom (로그인 상태 등)
export const userSettingsAtom = atom(
  (get) => get(userAtom),
  (get, set, newUser: User | null) => {
    set(userAtom, newUser);
    // 사용자가 변경되면 통계와 일기 데이터도 초기화
    if (!newUser) {
      set(userStatsAtom, null);
      set(userDiariesAtom, []);
    }
  }
);

// 사용자 통계 업데이트 atom
export const updateUserStatsAtom = atom(
  null,
  (get, set, stats: UserStats) => {
    set(userStatsAtom, stats);
  }
);

// 사용자 일기 목록 업데이트 atom
export const updateUserDiariesAtom = atom(
  null,
  (get, set, diaries: Diary[]) => {
    set(userDiariesAtom, diaries);
  }
);

// 새 일기 추가 atom
export const addDiaryAtom = atom(
  null,
  (get, set, newDiary: Diary) => {
    const currentDiaries = get(userDiariesAtom);
    set(userDiariesAtom, [newDiary, ...currentDiaries]);
    
    // 통계도 업데이트 필요 (실제로는 API 호출이 필요하지만 여기서는 간단히 처리)
    const currentStats = get(userStatsAtom);
    if (currentStats) {
      set(userStatsAtom, {
        ...currentStats,
        totalDiaries: currentStats.totalDiaries + 1,
        consecutiveDays: currentStats.consecutiveDays + 1, // 간단한 예시
      });
    }
  }
);

// 로딩 상태 업데이트 atom
export const setLoadingAtom = atom(
  null,
  (get, set, loading: boolean) => {
    set(loadingAtom, loading);
  }
); 