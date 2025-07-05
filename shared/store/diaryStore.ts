import { atom } from 'jotai';

// Write/1 - 기분
export const moodAtom = atom<string | null>(null);

// Write/2 - 감정 (다중 선택)
export const emotionsAtom = atom<string[]>([]);

// Write/3 - 활동 (다중 선택)
export const activitiesAtom = atom<string[]>([]);

// Write/4 - 상세 내용
export const contentAtom = atom<string>('');

// Write/5 - 왜곡된 사고
export const distortionsAtom = atom<number[]>([]);

// Write/6 - 대안적 사고
export const alternativeThoughtsAtom = atom<string>('');

// Write/7 - 감정 변화
export const moodChangeAtom = atom<string | null>(null);

// 전체 일기 데이터를 하나로 합치는 atom
export const diaryDataAtom = atom((get) => ({
  mood: get(moodAtom),
  emotions: get(emotionsAtom),
  activities: get(activitiesAtom),
  content: get(contentAtom),
  distortions: get(distortionsAtom),
  alternativeThoughts: get(alternativeThoughtsAtom),
  moodChange: get(moodChangeAtom),
  createdAt: new Date(),
}));

// 상태 초기화 atom
export const resetDiaryAtom = atom(
  null,
  (get, set) => {
    set(moodAtom, null);
    set(emotionsAtom, []);
    set(activitiesAtom, []);
    set(contentAtom, '');
    set(distortionsAtom, []);
    set(alternativeThoughtsAtom, '');
    set(moodChangeAtom, null);
  }
); 