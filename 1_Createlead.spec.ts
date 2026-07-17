import { expect, test } from "@playwright/test"

test("Create Lead in Leaftaps", async ({ page }) => {

    // Test Data
    const companyName = "TestLeaf";
    const firstName = "Ravikumar";
    const lastName = "R";
    const salutation = "Mr.";
    const title = "QA Engineer";
    const annualRevenue = "500000";
    const department = "Testing";
    const phoneNumber = "9876543210";

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
    await page.locator('[id="createLeadForm_companyName"]').fill(companyName);
    await page.locator('#createLeadForm_firstName').fill(firstName);
    await page.locator('[id="createLeadForm_lastName"]').fill(lastName);
    await page.locator('input[name="personalTitle"]').fill(salutation);
    await page.locator('input[name="generalProfTitle"]').fill(title);
    await page.locator('input[name="annualRevenue"]').fill(annualRevenue);
    await page.locator('[id="createLeadForm_departmentName"]').fill(department);
    await page.locator('[id="createLeadForm_primaryPhoneNumber"]').fill(phoneNumber);
    await page.locator('.smallSubmit').click();
    await page.waitForTimeout(3000);

    console.log("Lead created successfully");
    console.log("URL: " , page.url());
    console.log("Title: " , await page.title());
    await page.waitForTimeout(3000);

    // Verify the lead creation by checking the displayed values on the lead details page
    // Verify Company Name
    await expect(page.locator("#viewLead_companyName_sp")).toContainText(companyName);

    // Verify First Name
    await expect(page.locator("#viewLead_firstName_sp")).toHaveText(firstName);

    // Verify Last Name
    await expect(page.locator("#viewLead_lastName_sp")).toHaveText(lastName);

    // Verify Status
    await expect(page.locator("#viewLead_statusId_sp")).toHaveText("Assigned");

    // Additional assertions to verify the values
    const actualCompany = await page.locator("#viewLead_companyName_sp").textContent();
    expect(actualCompany).toContain(companyName);

    const actualFirstName = await page.locator("#viewLead_firstName_sp").textContent();
    expect(actualFirstName).toBe(firstName);

    const actualLastName = await page.locator("#viewLead_lastName_sp").textContent();
    expect(actualLastName).toBe(lastName);

    const actualStatus = await page.locator("#viewLead_statusId_sp").textContent();
    expect(actualStatus?.trim()).toBe("Assigned");
})