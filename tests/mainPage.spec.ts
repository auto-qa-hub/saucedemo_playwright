import { test, expect } from '@playwright/test';
import { MainPage } from './pages/MainPage';

test.describe("Main Page tests", () => {
    test('Visit Main Page', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.visitMainPage();

    //Перевірка, що поле "Username" відображається
    await expect(page.locator('input[data-test="username"]')).toBeVisible();

    //Перевірка, що поле "Password" відображається
    await expect(page.locator('input[data-test="password"]')).toBeVisible();

    //Перевірка, що кнопка "Login" відображається і активна
    await expect(page.locator('input[data-test="login-button"]')).toBeVisible();
    await expect(page.locator('input[data-test="login-button"]')).toBeEnabled();

    //Перевірка, що список користувачів відображається
    await expect(page.locator('div[data-test="login-credentials"]')).toBeVisible();

    //Перевірка, що блок з паролем відображається
    await expect(page.locator('div[data-test="login-password"]')).toBeVisible();
    });
});
