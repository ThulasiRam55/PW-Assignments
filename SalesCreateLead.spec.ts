import { test, expect } from '@playwright/test';

test('Create Lead in Salesforce', async ({ page }) => {

    const lastName = "Ram";
    const companyName = "TestLeaf";

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

    // Create a new Lead
    await page.locator("//div[@title='New']").click();
    await page.locator("button[name='salutation']").click();
    await page.getByRole("option", { name: "Mr." }).click();    
    await page.locator("input[name='lastName']").fill(lastName);    
    await page.locator("input[name='Company']").fill(companyName);    
    await page.locator("//button[@name='SaveEdit']").click();   
    
    // Verify Lead creation
    const leadName = page.locator("//lightning-formatted-name");
    await expect(leadName).toContainText(lastName);
    console.log("Lead Created:", await leadName.textContent());

});