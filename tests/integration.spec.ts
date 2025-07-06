import { test, expect } from '@playwright/test';
import { AuthHelper } from './utils/auth-helper';

test.describe('Integration Tests', () => {
  const testUser = {
    username: `testuser_${Date.now()}`,
    password: 'testpass123'
  };

  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 로그아웃
    await AuthHelper.logout(page);
  });

  test('should complete full user journey: register -> login -> write diary -> view stats', async ({ page }) => {
    // 1. 회원가입
    await AuthHelper.createTestUser(page, testUser.username, testUser.password);
    
    // 2. 로그인
    await AuthHelper.login(page, testUser.username, testUser.password);
    
    // 3. 홈 페이지 확인
    await expect(page.getByText('안녕하세요')).toBeVisible();
    await expect(page.getByText('오늘은 무슨 일이 있으셨나요?')).toBeVisible();
    
    // 4. 일기 작성 시작
    await page.getByRole('link', { name: '시작' }).click();
    await expect(page).toHaveURL('/write/1');
    
    // 5. 일기 작성 과정 (간단한 테스트)
    // 첫 번째 페이지: 기분 선택
    await page.getByText('😊').click();
    await page.getByRole('button', { name: '다음' }).click();
    
    // 두 번째 페이지: 감정 선택
    await page.getByText('기쁨').click();
    await page.getByRole('button', { name: '다음' }).click();
    
    // 세 번째 페이지: 활동 선택
    await page.getByText('운동').click();
    await page.getByRole('button', { name: '다음' }).click();
    
    // 네 번째 페이지: 내용 작성
    await page.getByPlaceholder('오늘 있었던 일을 자유롭게 적어보세요').fill('오늘은 테스트를 위한 일기를 작성했습니다.');
    await page.getByRole('button', { name: '다음' }).click();
    
    // 다섯 번째 페이지: 왜곡된 사고 선택
    await page.getByText('모든 것을 완벽하게 해야 한다').click();
    await page.getByRole('button', { name: '다음' }).click();
    
    // 여섯 번째 페이지: 대안적 사고 작성
    await page.getByPlaceholder('더 현실적이고 균형잡힌 생각을 적어보세요').fill('완벽하지 않아도 괜찮다.');
    await page.getByRole('button', { name: '다음' }).click();
    
    // 일곱 번째 페이지: 감정 변화 선택
    await page.getByText('😊').click();
    await page.getByRole('button', { name: '완료' }).click();
    
    // 6. 홈 페이지로 돌아와서 통계 확인
    await expect(page).toHaveURL('/home');
    await expect(page.getByText('1')).toBeVisible(); // 연속 작성일수
    
    // 7. 기록 페이지 확인
    await page.getByRole('link', { name: '고민 기록' }).click();
    await expect(page).toHaveURL('/record');
    await expect(page.getByText('고민 기록')).toBeVisible();
    
    // 8. 분석 보고서 확인
    await page.getByRole('link', { name: '분석 보고서' }).click();
    await expect(page).toHaveURL('/document');
    await expect(page.getByText('분석보고서')).toBeVisible();
  });

  test('should handle authentication errors correctly', async ({ page }) => {
    // 존재하지 않는 사용자로 로그인 시도
    await page.goto('/login');
    await page.getByPlaceholder('아이디를 입력하세요').fill('nonexistentuser');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('wrongpassword');
    await page.getByRole('button', { name: '로그인' }).click();
    
    // 에러 메시지 확인
    await expect(page.getByText('존재하지 않는 아이디입니다.')).toBeVisible();
  });

  test('should maintain user session across pages', async ({ page }) => {
    // 로그인
    await AuthHelper.login(page, testUser.username, testUser.password);
    
    // 여러 페이지를 이동하면서 로그인 상태 유지 확인
    await page.goto('/record');
    await expect(page.getByText('고민 기록')).toBeVisible();
    
    await page.goto('/document');
    await expect(page.getByText('분석보고서')).toBeVisible();
    
    await page.goto('/home');
    await expect(page.getByText('안녕하세요')).toBeVisible();
  });
}); 