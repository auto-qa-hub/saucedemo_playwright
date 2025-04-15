import { test, expect } from '@playwright/test';
import usersData from '../fixtures/usersData.json';
import { POManager } from '../page_objects_ts/POManager';

test.describe("Performance glitch user tests", () => {
    test('User path', async ({ page }) => {
        const poManager = new POManager(page);
        const username = usersData.users[3];
        const password = usersData.password;

        await poManager.mainPage.visitMainPage();
        await poManager.mainPage.fillUsername(username);
        await poManager.mainPage.fillPassword(password);

        await expect(page.locator('input[name="user-name"]')).toHaveValue(username);
        await expect(page.locator('input[name="password"]')).toHaveValue(password);
        await poManager.mainPage.loginButton();
        await page.waitForURL('/inventory.html');

        //add to cart all items
        await page.waitForSelector('button:has-text("Add to cart")');
        while (await page.locator('button:has-text("Add to cart")').count() > 0) {
        await page.locator('button:has-text("Add to cart")').first().click();
        }

        //remove from cart all items
        await page.waitForSelector('button:has-text("Remove")');
        while (await page.locator('button:has-text("Remove")').count() > 0) {
        await page.locator('button:has-text("Remove")').first().click();
        }

        await page.locator('button:has-text("Add to cart")').first().click();
        await page.click('.shopping_cart_link');
        await poManager.cartPage.clickCheckout();

        await poManager.checkoutStepOnePage.enterCheckoutDetails('John', 'Doe', '12345');
        await poManager.checkoutStepOnePage.submitCheckout();
        await poManager.checkoutStepTwoPage.completeCheckout();

        await poManager.userMenuPage.UserMenuIcon();
        await poManager.userMenuPage.Logout();
    });
});