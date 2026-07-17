/// <reference types="node" />

import { test, expect } from '@playwright/test';
import path from 'path';
import fs from "fs";

test('Service now', async ({ page }) => {
    //url
    const url = "https://dev419732.service-now.com/";

    //Navigate to url and login in to application
    await page.goto(url);
    await page.locator('[id="user_name"]').fill("admin");
    await page.locator('[id="user_password"]').fill("xcAK8%DT6x^x");
    await page.getByRole("button", { name: "Log in" }).click();
    await page.waitForURL("**/now/**");

    //Navigate to Service catalog and select mobile
    await expect(page.locator('div[aria-label="All"]')).toBeVisible();
    await page.locator('div[aria-label="All"]').click();
    const searchBox = page.getByPlaceholder("Filter");
    await searchBox.click();
    await searchBox.pressSequentially("Service Catalog", { delay: 100 });
    await page.keyboard.press("Enter");    
    await page.getByText("Service Catalog", { exact: true }).first().click();
    await page.waitForLoadState("domcontentloaded");
    const frameRef = page.frameLocator("#gsft_main");
    await frameRef.locator('[class="category_title_link"]').filter({ hasText: 'Mobiles' }).click();
    await frameRef.getByRole("link", { name: 'Apple iPhone 13', exact: true }).click();

    //Replacement for a lost or broken phone
    await frameRef.locator(`[class='radio-label']`).filter({ hasText: 'No' }).click();

    //Monthly data allowance
    const dropDown = frameRef.locator(`[class='form-control cat_item_option ']`);
    await dropDown.selectOption({ value: '500MB' });
    console.log(await dropDown.count());

    //Choose Color
    const starLight = frameRef.locator(`[class='radio-label']`).filter({ hasText: 'Starlight' });
    await expect(starLight).toBeVisible();
    await starLight.click();

    //Choose Storage option
    const option256GB = frameRef.locator(`[class='radio-label']`).filter({ hasText: '256 GB' });
    await expect(option256GB).toBeVisible();
    await option256GB.click();

    //Click on Order now
    const orderBtn = frameRef.locator('#oi_order_now_button');
    await expect(orderBtn).toBeEnabled();
    await orderBtn.click();
    await expect(page).toHaveTitle(/Order Status/, { timeout: 60000 });

    //Verify the success message
    await expect(frameRef.locator("//div[contains(@class,'success')]")).toBeVisible();
    const successMsg = frameRef.locator("//div[contains(@class,'success')]/child::span[contains(text(),'Thank')]");
    const sucess = await successMsg.textContent();
    console.log("Success message : ", sucess);
    expect(sucess).toContain("Thank you");

    //Verify the order status
    const orderStatus = page.locator('.experience-title');
    const order = await orderStatus.textContent();
    console.log("Order status : ", order);
    expect(order).toContain("Order Status");

    //Page title and URL 
    console.log("Title : ", await page.title());
    console.log("URL : ", page.url());

    //Screenshot of the checkoout page
    await page.screenshot({ path : "Screenshots/servicenow.png", fullPage : true });
    await page.waitForTimeout(3000)
});