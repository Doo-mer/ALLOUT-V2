import { Page } from '@playwright/test';

export class AuthHelper {
  /**
   * 테스트용 사용자 계정 생성
   */
  static async createTestUser(page: Page, username: string, password: string) {
    await page.goto('/register');
    
    await page.getByPlaceholder('아이디를 입력하세요').fill(username);
    await page.getByPlaceholder('비밀번호를 입력하세요 (6자 이상)').fill(password);
    await page.getByPlaceholder('비밀번호를 다시 입력하세요').fill(password);
    
    await page.getByRole('button', { name: '회원가입' }).click();
    
    // 회원가입 성공 메시지 확인
    await page.waitForSelector('text=회원가입이 완료되었습니다!');
  }

  /**
   * 사용자 로그인
   */
  static async login(page: Page, username: string, password: string) {
    await page.goto('/login');
    
    await page.getByPlaceholder('아이디를 입력하세요').fill(username);
    await page.getByPlaceholder('비밀번호를 입력하세요').fill(password);
    
    await page.getByRole('button', { name: '로그인' }).click();
    
    // 로그인 성공 후 홈 페이지로 이동하는지 확인
    await page.waitForURL('/home');
  }

  /**
   * 로그아웃 (localStorage 클리어)
   */
  static async logout(page: Page) {
    if (page.url() === 'about:blank') {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
    }
    await page.evaluate(() => {
      localStorage.clear();
    });
  }

  /**
   * 현재 로그인된 사용자 정보 가져오기
   */
  static async getCurrentUser(page: Page) {
    if (page.url() === 'about:blank') {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
    }
    return await page.evaluate(() => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    });
  }

  /**
   * 로그인 상태 확인
   */
  static async isLoggedIn(page: Page): Promise<boolean> {
    const user = await this.getCurrentUser(page);
    return user !== null;
  }
} 