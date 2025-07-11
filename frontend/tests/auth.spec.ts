import { test, expect } from '@playwright/test';

test.describe('Google OAuth 로그인 테스트', () => {
  test('로그인 페이지에서 Google OAuth 로그인이 정상적으로 작동해야 함', async ({ page }) => {
    // 로그인 페이지로 이동
    await page.goto('/auth/login');
    
    // Google 로그인 버튼 클릭
    await page.click('[data-testid="google-login-button"]');
    
    // URL이 Google OAuth URL로 리다이렉트되는지 확인
    const url = page.url();
    expect(url).toContain('accounts.google.com');
    expect(url).toContain('oauth2/v2/auth');
    
    // 필수 OAuth 파라미터들이 올바르게 인코딩되어 있는지 확인
    expect(url).toContain('client_id=');
    expect(url).toContain('redirect_uri=');
    expect(url).toContain('response_type=code');
    expect(url).toContain('scope=');
  });
}); 