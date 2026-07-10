import { test, expect } from '@playwright/test';

test('Edit Lead in Salesforce', async ({ page }) => {

    const lastName = "Ram";
    const companyName = "HCL";

    // Login to Salesforce
    await page.goto("https://login.salesforce.com/");
    await page.getByLabel("Username").fill("dilipkumar.rajendran@testleaf.com");
    await page.getByLabel("Password").fill("TestLeaf@2025");
    await page.getByRole("button", { name: "Log In" }).click();

    // Verify Home page
    await expect(page).toHaveTitle(/Lightning Experience/);
    await expect(page).toHaveURL(/lightning/);

    // Navigate to Leads tab
    await expect(page.locator(".slds-icon-waffle")).toBeVisible();
    await page.locator(".slds-icon-waffle").click();
    await page.locator("//button[text()='View All']").click();
    await expect(page.locator("(//p[text()='Sales'])")).toBeVisible();
    await page.locator("(//p[text()='Sales'])").click();
    await expect(page.locator("a[title='Leads']")).toBeVisible();
    await page.locator("a[title='Leads']").click();

    // Edit an existing Lead
    await expect(page.locator("//div[@title='New']")).toBeVisible();
    await page.locator("(//table//tbody/tr[1]//th//a)[1]").click();
    await expect(page.locator("//button[@name='Edit']")).toBeVisible(); 
    await page.locator("//button[@name='Edit']").click();
    await page.locator("input[name='Company']").fill(companyName);
    await page.locator("//button[@name='SaveEdit']").click();
    
    // Verify Lead update
    const leadName = page.locator("//lightning-formatted-name");
    await expect(leadName).toContainText(lastName);
    console.log("Lead Created:", await leadName.textContent());

    const updatedCompanyName = page.locator("//p[@title='Company']/following-sibling::p//lightning-formatted-text");
    await expect(updatedCompanyName).toContainText(companyName);
    console.log("Lead Updated with Company Name:", await updatedCompanyName.textContent());     

});