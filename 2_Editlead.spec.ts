import { expect, test } from "@playwright/test"

test("Edit lead in Leaftaps", async ({ page }) => {

    // Test Data
    const firstName = "Ravikumar";
    const updatedCompany = "HCL Technologies";
    const updatedRevenue = "800000";
    const updatedDepartment = "Automation Testing";
    const description = "Lead details updated using Playwright.";

    //login to the application
    await page.goto("https://leaftaps.com/opentaps/control/main");
    await page.locator('[id="username"]').fill("Demosalesmanager");
    await page.locator(`[id="password"]`).fill("crmsfa");
    await page.locator('[class="decorativeSubmit"]').click();
    await page.waitForTimeout(3000);

    console.log("Login successful");
    console.log("URL: ", page.url());
    console.log("Title: ", await page.title());

    //Navigate to the Leads section and click on Find Leads
    await page.locator("//a[contains(text(),'CRM/SFA')]").click();
    await page.locator("//a[text()='Leads']").click();
    await page.locator("//a[text()='Find Leads']").click();

    // Search for the lead using the first name
    await page.locator('(//input[@name="firstName"])[3]').fill(firstName);
    await page.locator('//button[text()="Find Leads"]').click();
    await page.locator('(//div[@class="x-grid3-cell-inner x-grid3-col-partyId"]/a)[1]').click();

    // Edit the lead details
    await page.locator('//a[@class="subMenuButton" and text()="Edit"]').click();
    await page.locator("#updateLeadForm_companyName").fill(updatedCompany);
    await page.locator("#updateLeadForm_annualRevenue").fill(updatedRevenue);
    await page.locator("#updateLeadForm_departmentName").fill(updatedDepartment);
    await page.locator("#updateLeadForm_description").fill(description);
    await page.locator("//input[@value='Update']").click();

    console.log("Lead updated successfully");
    console.log("URL: ", page.url());
    console.log("Title: ", await page.title());
    await page.waitForTimeout(3000);

    // Verify the updated lead details
    await expect(page.locator("#viewLead_companyName_sp")).toContainText(updatedCompany);

    await expect(page.locator("#viewLead_annualRevenue_sp")).toHaveText("$800,000.00");

    await expect(page.locator("#viewLead_departmentName_sp")).toHaveText(updatedDepartment);

    await expect(page.locator("#viewLead_description_sp")).toHaveText(description);
})