import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage';

test.describe("Main Page tests", () => {
    test('Visit Main Page', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.visitMainPage();

    });
});
