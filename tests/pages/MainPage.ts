import { Page } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}

  async visitMainPage() {
    await this.page.goto('/');
  }
}
