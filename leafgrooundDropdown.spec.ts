import { test, expect } from '@playwright/test';

test('LeafGround Select Assignment', async ({ page }) => {

    // Navigate to the application
    await page.goto("https://leafground.com/select.xhtml");

    //Select your favorite UI automation tool
    await page.locator("//select[@class='ui-selectonemenu']").selectOption({ label: "Playwright" });

    //Get the count and print all the values
    const tools = page.locator("//select[@class='ui-selectonemenu']/option");

    const count = await tools.count();
    console.log("Total Options :", count);

    for (let i = 1; i < count; i++) {
         const ddText = await page.locator(`//select[@class='ui-selectonemenu']/option[${i}]`).textContent();
        console.log(ddText);
    }

    //Choose your preferred Country
    await page.locator("//label[text()='Select Country']").click();
    await page.locator("//li[text()='India']").click();

    //Confirm Cities belongs to Country is loaded
    await expect(page.locator("//label[text()='Select City']")).toBeVisible();
    await page.locator("//label[text()='Select City']").click();
    await expect(page.locator("//li[text()='Chennai']")).toBeVisible();
    await page.locator("//li[text()='Chennai']").click();

    //Choose any three courses
    await page.locator("//button[contains(@class,'ui-autocomplete-dropdown')]").click();
    await page.locator("//li[@data-item-label='Selenium WebDriver']").click();
    await page.locator("//button[contains(@class,'ui-autocomplete-dropdown')]").click();
    await page.locator("//li[@data-item-label='Playwright']").click();
    await page.locator("//button[contains(@class,'ui-autocomplete-dropdown')]").click();
    await page.locator("//li[@data-item-label='AWS']").click();

    //Choose a language and print all framework values
    await page.locator("//label[text()='Select Language']").click();
    await page.locator("//li[text()='English']").click();

    //Print all language values
    const languages = page.locator("//li[@data-label='Select Language']/following-sibling::li");
    const languageCount = await languages.count();

    for (let i = 0; i < languageCount; i++) {
        console.log(await languages.nth(i).textContent());
    }

    //Select 'Two' irrespective of language
    await page.locator("//label[text()='Select Values']").click();
    await page.locator("//li[text()='Two']").click();

    await page.waitForTimeout(3000);
});