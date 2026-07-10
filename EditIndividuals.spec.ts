import { test, expect } from '@playwright/test';

test('Edit Individuals in Salesforce', async ({ page }) => {

    const lastName = "Ram";
     const firstName = "Thulasi";

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
    await expect(page.locator("a[title='Individuals']")).toBeVisible();
    await page.locator("a[title='Individuals']").click();

    // Edit the Individual
    await page.locator("input[placeholder='Search this list...']").fill(lastName);
    await page.keyboard.press("Enter");
    await page.locator("(//span[text()='Show Actions'])[1]").click();
    await expect(page.locator("//li[contains(@class,'slds-dropdown')]//a[@title='Edit']")).toBeVisible();
    await page.locator("//li[contains(@class,'slds-dropdown')]//a[@title='Edit']").click();
    await page.locator("//span[text()='Salutation']/ancestor::div[contains(@class,'uiInputSelect')]//a[@role='button']").click();
    await page.getByRole("option", { name: "Mr." }).click();
    await page.locator("//input[contains(@class,'firstName')]").fill(firstName);
    await page.locator("//button[@title='Save']/span").click();

    // Verify Individual creation
    // Wait for the toast message to appear and verify its content
    const toast = page.locator("//span[contains(@class,'toastMessage')]");
    await expect(toast).toBeVisible();
    const toastText = await toast.textContent();
    console.log("Toast Message:", toastText);

    // Verify that the toast message contains the last name and the expected success message
    await expect(toast).toContainText(firstName);
    await expect(toast).toContainText("was saved");   
});