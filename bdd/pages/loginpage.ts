import type { Locator, Page } from '@playwright/test';

export default class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"][value="Log In"]');
    
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async enterCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> { 
    await this.loginButton.click();
  }

  async waitForDashboard(): Promise<void> {
    await this.page.waitForURL('**/overview.htm');
  }
}