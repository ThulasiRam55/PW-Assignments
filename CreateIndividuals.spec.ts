import { test, expect } from '@playwright/test';

test('Create Individuals in Salesforce', async ({ page }) => {

    const lastName = "Ram";

    // Login to Salesforce
    await page.goto("https://login.salesforce.com/");
    await page.getByLabel("Username").fill("dilipkumar.rajendran@testleaf.com");
    await page.getByLabel("Password").fill("TestLeaf@2025");
    await page.getByRole("button", { name: "Log In" }).click();

    // Verify Home page
    await expect(page).toHaveTitle(/Lightning Experience/);
    await expect(page).toHaveURL(/lightning/);

    // Navigate to Individuals tab
    await expect(page.locator(".slds-icon-waffle")).toBeVisible();
    await page.locator(".slds-icon-waffle").click();
    await page.locator("//button[text()='View All']").click();
    await expect(page.locator("input[placeholder*='Search']")).toBeVisible();
    await page.locator("input[placeholder*='Search']").fill("Individuals");
    await page.locator("//mark[text()='Individuals']").click();
    await expect(page.locator("//span[text()='Individuals']/ancestor::a/following-sibling::one-app-nav-bar-item-dropdown")).toBeVisible();
    await page.locator("//span[text()='Individuals']/ancestor::a/following-sibling::one-app-nav-bar-item-dropdown").click();
    await expect(page.locator("//span[text()='New Individual']")).toBeVisible();
    await page.locator("//span[text()='New Individual']").click();

    // Create a new Individual
    await expect(page.locator("input[placeholder='Last Name']")).toBeVisible();
    await page.locator("input[placeholder='Last Name']").fill(lastName);
    await page.locator("//button[@title='Save']/span").click();

    // Verify Individual creation
    // Wait for the toast message to appear and verify its content
    const toast = page.locator("//span[contains(@class,'toastMessage')]");
    await expect(toast).toBeVisible();
    const toastText = await toast.textContent();
    console.log("Toast Message:", toastText);

    // Verify that the toast message contains the last name and the expected success message
    await expect(toast).toContainText(lastName);
    await expect(toast).toContainText("was created");   
});