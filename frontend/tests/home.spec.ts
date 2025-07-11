import { test, expect } from '@playwright/test';

test.describe('홈페이지 테스트', () => {
  test('기본 레이아웃이 올바르게 렌더링되어야 함', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // 메인 컨테이너가 존재하는지 확인
    await expect(page.locator('.container')).toBeVisible();
    
    // 로그인 버튼이 존재하는지 확인
    await expect(page.getByTestId('login-button')).toBeVisible();
    
    // 브라우저 헤더가 존재하는지 확인
    await expect(page.locator('.bg-gray-100')).toBeVisible();
    
    // 도메인 텍스트가 올바른지 확인
    await expect(page.locator('text=www.kimdonghee.com')).toBeVisible();
    
    // 플랫폼 제목이 올바른지 확인
    await expect(page.locator('text=Sustainability Platform')).toBeVisible();
  });

  test('메인 네비게이션 링크가 올바르게 작동해야 함', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // ESG Performance 링크 확인
    const esgPerformanceLink = page.getByRole('link', { name: 'ESG Performance' });
    await expect(esgPerformanceLink).toBeVisible();
    
    // ESG Storybook 링크 확인
    const esgStorybookLink = page.getByRole('link', { name: 'ESG Storybook' });
    await expect(esgStorybookLink).toBeVisible();
    
    // Appendix 링크 확인
    const appendixLink = page.getByRole('link', { name: 'Appendix' });
    await expect(appendixLink).toBeVisible();
  });
}); 