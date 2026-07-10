import { test, expect } from "@playwright/test";

test("LeafGround Checkbox Assignment", async ({ page }) => {

    //Navigate to the application
    await page.goto("https://leafground.com/checkbox.xhtml");

    //Click on the Basic Checkbox
    await page.locator("//h5[text()='Basic Checkbox']/following::div[contains(@class,'ui-chkbox-box')][1]").click();

    //Click on the Notification Checkbox
    await page.locator("//h5[text()='Notification']/following::div[contains(@class,'ui-chkbox-box')][1]").click();

    //Verify the notification message
    const message = page.locator("//span[contains(@class,'ui-growl-title') or contains(@class,'ui-toast-summary')]");
    await expect(message).toBeVisible();
    console.log(await message.textContent());
    await page.locator(".ui-growl-item-container").waitFor({ state: "hidden" });

    //Select your favorite language
    await page.locator("//label[text()='Java']/preceding-sibling::div").click();

    //Click the Tri-State Checkbox
    await page.locator("//h5[text()='Tri State Checkbox']/following::div[contains(@class,'ui-chkbox-box')][1]").click();

    //Verify the selected tri-state option
    const triStateMessage = page.locator("//span[contains(@class,'ui-growl-title') or contains(@class,'ui-toast-summary')]");
    await expect(triStateMessage).toBeVisible();
    console.log("Tri-State:", await triStateMessage.textContent());
    await page.locator(".ui-growl-item-container").waitFor({ state: "hidden" });

    //Click the Toggle Switch
    await page.locator("//div[contains(@class,'ui-toggleswitch-slider')]").click();

    //Verify the toggle message
    const toggleMessage = page.locator("//span[contains(@class,'ui-growl-title') or contains(@class,'ui-toast-summary')]");
    await expect(toggleMessage).toBeVisible();
    console.log("Toggle:", await toggleMessage.textContent());
    await page.locator(".ui-growl-item-container").waitFor({ state: "hidden" });

    //Verify if the Checkbox is disabled
    await expect(page.locator("//h5[text()='Verify if check box is disabled']/following::input[1]")).toBeDisabled();

    //Select multiple options
    await page.locator("//ul[contains(@class,'ui-selectcheckboxmenu-multiple-container')]").click();
    await expect(page.locator("//li[@data-item-value='Miami']/div")).toBeVisible();
    await page.locator("//li[@data-item-value='Miami']/div").click();
    await page.locator("//li[@data-item-value='London']/div").click();
    await page.locator("//li[@data-item-value='Paris']/div").click();

    //Close the multi-select popup
    await page.keyboard.press("Escape");

    //Additional verification
    await expect(page.locator("//ul[@data-label='Cities']/li[@data-item-value='Miami']")).toBeVisible();
    await page.waitForTimeout(5000);

    //Close browser
    await page.close();
});