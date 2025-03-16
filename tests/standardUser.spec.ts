import { test, expect } from '@playwright/test';
import { MainPage } from '../page_objects_ts/MainPage';
import usersData from '../fixtures/usersData.json';

test.describe("Standard user tests", () => {
    test('Standard user path', async ({ page }) => {
        const mainPage = new MainPage(page);
        const username = usersData.users[0];
        const password = usersData.password;

        await mainPage.visitMainPage();
        await mainPage.fillUsername(username);
        await mainPage.fillPassword(password);

        await expect(page.locator('input[name="user-name"]')).toHaveValue(username);
        await expect(page.locator('input[name="password"]')).toHaveValue(password);

        await mainPage.loginButton();

        await page.waitForURL('/inventory.html');

    });
    
});
