/// <reference types="node" />

import { test, expect } from '@playwright/test';
import path from 'path';

test('File upload in Salesforce', async ({ page }) => {

    const accountName = "TestLeaf Automation";
     const documentPath = path.join(__dirname, "../../../Data/Sample.pdf");

    // Login to Salesforce
    await page.goto("https://login.salesforce.com/ ");
    await page.getByLabel("Username").fill("dilipkumar.rajendran@testleaf.com");
    await page.getByLabel("Password").fill("TestLeaf@2025");
    await page.getByRole("button", { name: "Log In" }).click();
    console.log("Login Successful");
    console.log("URL: ", page.url());
    console.log("Title: ", await page.title());

    // Check if the "Switch to Lightning" button is present and click it if it is
    const switchToLightning = page.locator(".switch-to-lightning");

    if (await switchToLightning.count() > 0) {
        await switchToLightning.click();
        console.log("Clicked Switch to Lightning");
    } else {
        console.log("Switch to Lightning button not present. Skipping...");
    }

    await page.waitForTimeout(5000);
    // Verify that the page has navigated to the Lightning Experience
    await expect(page).toHaveTitle("Home | Salesforce");
    await expect(page).toHaveURL("https://testleaf.lightning.force.com/lightning/page/home");

    // Navigate to the Accounts tab and create a new account
    await expect(page.locator(".slds-icon-waffle")).toBeVisible();
    await page.locator(".slds-icon-waffle").click();
    await page.locator("//button[text()='View All']").click();
    await expect(page.locator("input[placeholder*='Search']")).toBeVisible();
    await page.locator("input[placeholder*='Search']").fill("Accounts");
    await page.locator("//mark[text()='Accounts']").click();
    await expect(page.locator("a[title='Accounts']")).toBeVisible();
    await page.locator("a[title='Accounts']").click();
    await expect(page).toHaveURL(/.*Account.*/);
    await page.getByRole("button", { name: "New", exact: true }).click();
    await page.locator("input[name='Name']").fill(accountName);
    await page.locator("//button[@aria-label='Type']").click();
    await page.getByRole("option", { name: "Prospect" }).click();
    await page.locator("//button[@aria-label='Industry']").click();
    await page.getByRole("option", { name: "Banking" }).click();
    await page.locator("//button[@name='SaveEdit']").click();
    
    // Wait for the toast message to appear and verify its content
    const toast = page.locator("//span[contains(@class,'toastMessage')]");
    await expect(toast).toBeVisible();
    const toastText = await toast.textContent();
    console.log("Toast Message:", toastText);
    
    // Verify that the toast message contains the account name and the expected success message
    await expect(toast).toContainText(accountName);
    await expect(toast).toContainText("was created");
    console.log("Account created successfully.");

    // Open Upload Files dialog
    const uploadBtn = page.getByRole("button", { name: "Upload Files" }).first();
    await expect(uploadBtn).toBeVisible();
    await uploadBtn.click();

    // Upload file
    await page.locator("input[type='file']").setInputFiles(documentPath);
    await expect(page.locator("//*[contains(text(),'file uploaded')]")).toBeVisible();
    await page.getByRole("button", { name: "Done" }).click();

    //verify the success message
    await expect(toast).toBeVisible();
    const toastText1 = await toast.textContent();
    console.log("Toast Message:", toastText1);
    await expect(toast).toContainText("file was added to the Account");
    const exptext = page.locator(`//ul[@class="uiAbstractList"]//following::span[@title="Sample"]`).first()
    await expect(exptext).toBeVisible();
    await expect(exptext).toHaveText("Sample");

    console.log("File uploaded successfully.");
    await page.waitForTimeout(3000);
});