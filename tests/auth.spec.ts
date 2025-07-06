import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 페이지를 새로고침
    await page.goto('/');
  });

  test('should display login page correctly', async ({ page }) => {
    await page.goto('/login');
    
    // 로그인 페이지 요소들이 존재하는지 확인
    await expect(page.getByText('로그인')).toBeVisible();
    await expect(page.getByText('계정에 로그인')).toBeVisible();
    await expect(page.getByPlaceholder('아이디를 입력하세요')).toBeVisible();
    await expect(page.getByPlaceholder('비밀번호를 입력하세요')).toBeVisible();
    await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
  });

  test('should display register page correctly', async ({ page }) => {
    await page.goto('/register');
    
    // 회원가입 페이지 요소들이 존재하는지 확인
    await expect(page.getByText('회원가입')).toBeVisible();
    await expect(page.getByText('새 계정 만들기')).toBeVisible();
    await expect(page.getByPlaceholder('아이디를 입력하세요')).toBeVisible();
    await expect(page.getByPlaceholder('비밀번호를 입력하세요 (6자 이상)')).toBeVisible();
    await expect(page.getByPlaceholder('비밀번호를 다시 입력하세요')).toBeVisible();
    await expect(page.getByRole('button', { name: '회원가입' })).toBeVisible();
  });

  test('should show error message for empty fields on login', async ({ page }) => {
    await page.goto('/login');
    
    // 빈 필드로 로그인 시도
    await page.getByRole('button', { name: '로그인' }).click();
    
    // 에러 메시지가 표시되는지 확인
    await expect(page.getByText('아이디와 비밀번호를 입력해주세요.')).toBeVisible();
  });

  test('should show error message for empty fields on register', async ({ page }) => {
    await page.goto('/register');
    
    // 빈 필드로 회원가입 시도
    await page.getByRole('button', { name: '회원가입' }).click();
    
    // 에러 메시지가 표시되는지 확인
    await expect(page.getByText('아이디와 비밀번호는 필수입니다.')).toBeVisible();
  });

  test('should show error for password mismatch on register', async ({ page }) => {
    await page.goto('/register');
    
    // 아이디와 비밀번호 입력
    await page.getByPlaceholder('아이디를 입력하세요').fill('testuser');
    await page.getByPlaceholder('비밀번호를 입력하세요 (6자 이상)').fill('password123');
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('password456');
    
    // 회원가입 버튼 클릭
    await page.getByRole('button', { name: '회원가입' }).click();
    
    // 비밀번호 불일치 에러 메시지 확인
    await expect(page.getByText('비밀번호가 일치하지 않습니다.')).toBeVisible();
  });

  test('should show error for short password on register', async ({ page }) => {
    await page.goto('/register');
    
    // 짧은 비밀번호 입력
    await page.getByPlaceholder('아이디를 입력하세요').fill('testuser');
    await page.getByPlaceholder('비밀번호를 입력하세요 (6자 이상)').fill('123');
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill('123');
    
    // 회원가입 버튼 클릭
    await page.getByRole('button', { name: '회원가입' }).click();
    
    // 비밀번호 길이 에러 메시지 확인
    await expect(page.getByText('비밀번호는 6자 이상이어야 합니다.')).toBeVisible();
  });
}); 