import { test, expect } from '@playwright/test';
import usersData from '../fixtures/usersData.json';
import { POManager } from '../page_objects_ts/POManager';

test.describe("Standard user tests", () => {
    test('Standard user path', async ({ page }) => {
        const poManager = new POManager(page);
        const username = usersData.users[0];
        const password = usersData.password;

        await poManager.mainPage.visitMainPage();
        await poManager.mainPage.fillUsername(username);
        await poManager.mainPage.fillPassword(password);

        await expect(page.locator('input[name="user-name"]')).toHaveValue(username);
        await expect(page.locator('input[name="password"]')).toHaveValue(password);

        await poManager.mainPage.loginButton();

        await page.waitForURL('/inventory.html');

    });
    
});
