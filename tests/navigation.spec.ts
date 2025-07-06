import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 메인 페이지로 이동
    await page.goto('/');
  });

  test('should navigate to home page from main page', async ({ page }) => {
    // 메인 페이지에서 시작 버튼 클릭
    await page.getByRole('link', { name: '시작' }).click();
    
    // 홈 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/home');
    await expect(page.getByText('안녕하세요')).toBeVisible();
  });

  test('should navigate to record page from home', async ({ page }) => {
    // 홈 페이지로 이동
    await page.goto('/home');
    
    // 고민 기록 버튼 클릭
    await page.getByRole('link', { name: '고민 기록' }).click();
    
    // 기록 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/record');
    await expect(page.getByText('고민 기록')).toBeVisible();
  });

  test('should navigate to document page from home', async ({ page }) => {
    // 홈 페이지로 이동
    await page.goto('/home');
    
    // 분석 보고서 버튼 클릭
    await page.getByRole('link', { name: '분석 보고서' }).click();
    
    // 문서 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/document');
    await expect(page.getByText('분석보고서')).toBeVisible();
  });

  test('should navigate to write page from home', async ({ page }) => {
    // 홈 페이지로 이동
    await page.goto('/home');
    
    // 시작 버튼 클릭
    await page.getByRole('link', { name: '시작' }).click();
    
    // 일기 작성 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/write/1');
  });

  test('should navigate between write pages', async ({ page }) => {
    // 일기 작성 첫 페이지로 이동
    await page.goto('/write/1');
    
    // 첫 페이지 요소 확인
    await expect(page.getByText('일기')).toBeVisible();
    
    // 다음 페이지로 이동
    await page.goto('/write/2');
    await expect(page).toHaveURL('/write/2');
    
    // 세 번째 페이지로 이동
    await page.goto('/write/3');
    await expect(page).toHaveURL('/write/3');
  });

  test('should navigate to login from register page', async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto('/register');
    
    // 로그인 링크 클릭
    await page.getByText('이미 계정이 있으신가요? 로그인').click();
    
    // 로그인 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/login');
    await expect(page.getByText('로그인')).toBeVisible();
  });

  test('should navigate to register from login page', async ({ page }) => {
    // 로그인 페이지로 이동
    await page.goto('/login');
    
    // 회원가입 링크 클릭
    await page.getByText('계정이 없으신가요? 회원가입').click();
    
    // 회원가입 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/register');
    await expect(page.getByText('회원가입')).toBeVisible();
  });
}); 