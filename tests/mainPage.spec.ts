import { test, expect } from '@playwright/test';
import { POManager } from '../page_objects_ts/POManager';

test.describe("Main Page tests", () => {
    test('Visit Main Page', async ({ page }) => {
        const poManager = new POManager(page);
        await poManager.mainPage.visitMainPage();

    //Verify that the "Username" field is displayed
    await expect(page.locator('input[data-test="username"]')).toBeVisible();

    //Verify that the "Password" field is displayed
    await expect(page.locator('input[data-test="password"]')).toBeVisible();

    //Verify that the "Login" button is visible and active
    await expect(page.locator('input[data-test="login-button"]')).toBeVisible();
    await expect(page.locator('input[data-test="login-button"]')).toBeEnabled();

    //Verify that the user list is displayed
    await expect(page.locator('div[data-test="login-credentials"]')).toBeVisible();

    //Checking that the password block is displayed
    await expect(page.locator('div[data-test="login-password"]')).toBeVisible();
    });
});
