import { expect, test } from "@playwright/test"

test("Leaf playground", async ({ page }) => {

    //navigate to the application
    await page.goto("https://leafground.com/input.xhtml");

    //assertion to check the input field is disabled or not    
    await expect(page.locator('//input[contains(@class,"ui-state-disabled")]')).toBeDisabled();

    //assertion to check the input field is editable or not
    await expect(page.locator('(//input[contains(@class,"ui-inputfield")])[1]')).toBeEditable();

    //assertion to check the input field is disabled or not
    await expect.soft(page.locator('(//input[contains(@class,"ui-inputfield")])[2]')).toBeDisabled();

    //Fill the input field with the name "Ram"
    await page.locator('(//input[contains(@class,"ui-inputfield")])[1]').fill("Ram");
})