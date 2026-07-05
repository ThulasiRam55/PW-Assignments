import { test } from "@playwright/test"

test("Facebook Login", async ({ page }) => {

    await page.goto("https://www.facebook.com/");

    await page.locator('[name="email"]').fill("test@example.com");
    await page.locator(`[name="pass"]`).fill("password123");
    await page.locator('//*[@aria-label="Log in"]').click();

    console.log("Login unsuccessful");
    console.log("URL: " , page.url());
    console.log("Title: " , await page.title());

    await page.locator('//*[contains(text(),"password?")]').click();
    await page.waitForTimeout(3000);
    await page.locator('svg>path').click();

    await page.locator('//*[text()="Create new account"]').click();
    await page.waitForTimeout(3000);
})