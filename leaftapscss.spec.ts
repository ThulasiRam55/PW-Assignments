import { test } from "@playwright/test"

test("Leaftaps Login", async ({ page }) => {

    //login to the application
    await page.goto("https://leaftaps.com/opentaps/control/main");
    await page.locator('[id="username"]').fill("Demosalesmanager");
    await page.locator(`[id="password"]`).fill("crmsfa");
    await page.locator('[class="decorativeSubmit"]').click();
    await page.waitForTimeout(3000);

    console.log("Login successful");
    console.log("URL: " , page.url());
    console.log("Title: " , await page.title());

    //Navigate to the Leads section and click on Create Lead
    await page.locator("//a[contains(text(),'CRM/SFA')]").click();
    await page.locator("//a[text()='Leads']").click();
    await page.locator("//a[text()='Create Lead']").click();

    //creation or filling of the form
    await page.locator('[id="createLeadForm_companyName"]').fill("TestLeaf");
    await page.locator('#createLeadForm_firstName').fill("Ravikumar");
    await page.locator('[id="createLeadForm_lastName"]').fill("Rajendran");
    await page.locator('input[name="personalTitle"]').fill("Mr.");
    await page.locator('input[name="generalProfTitle"]').fill("Automation Tester");
    await page.locator('input[name="annualRevenue"]').fill("7LPA");
    await page.locator('[id="createLeadForm_departmentName"]').fill("Testing");
    await page.locator('[id="createLeadForm_primaryPhoneNumber"]').fill("1234567890");
    await page.locator('.smallSubmit').click();
    await page.waitForTimeout(3000);

    console.log("Lead created successfully");
    console.log("URL: " , page.url());
    console.log("Title: " , await page.title());
    await page.waitForTimeout(3000);
})