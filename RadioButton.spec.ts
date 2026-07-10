import { test, expect } from '@playwright/test';

test('LeafGround Radio Button Assignment', async ({ page }) => {

    //Navigate to the application
    await page.goto("https://leafground.com/radio.xhtml");
    
    //Identify and assert the default selected radio button
    const defaultRadio = page.locator("//*[contains(text(),'Find the default')]/following::input[@checked='checked'][1]");
    await expect(defaultRadio).toBeChecked();

    //Click your favorite browser and assert it is selected
    await page.locator("//*[contains(text(),'favorite browser')]/following::label[text()='Chrome'][1]").click();
    const chrome = page.locator("//*[contains(text(),'favorite browser')]/following::label[text()='Chrome'][1]");
    await expect(chrome).toBeChecked();
    await page.waitForTimeout(3000);

    //Click one of the cities
    await page.locator("//label[text()='Chennai']").click();
    const chennai = page.locator("//label[text()='Chennai']/preceding-sibling::div//input");
    await expect(chennai).toBeChecked();
    await page.waitForTimeout(3000);

    //Select the age group and verify the default selected radio button
    const defaultAge = page.locator("//label[text()='21-40 Years']/preceding-sibling::div//input");
    await expect(defaultAge).toBeChecked();
    console.log("Default Age Group is selected.");
});