import { test, expect } from '@playwright/test';
import Navigation from '../src/components/Navigation';

test.describe('Navigation 컴포넌트', () => {
  test('기본 렌더링 테스트', async ({ page }) => {
    await page.goto('/');
    
    // 로고가 표시되는지 확인
    const logo = page.getByText('LIF');
    await expect(logo).toBeVisible();
    
    // 로그인 버튼이 표시되는지 확인
    const loginButton = page.getByText('로그인');
    await expect(loginButton).toBeVisible();
  });

  test('로그인 버튼 클릭 시 로그인 페이지로 이동', async ({ page }) => {
    await page.goto('/');
    
    // 로그인 버튼 클릭
    const loginButton = page.getByText('로그인');
    await loginButton.click();
    
    // 로그인 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/auth/login');
  });
}); 