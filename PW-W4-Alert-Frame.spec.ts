import { expect, test } from "@playwright/test";

test("Learn to interact with alerts", async ({ page }) => {

    await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");

    page.on("dialog", async (allalert) => {
        console.log(allalert.type())

        console.log(allalert.message());

        await allalert.accept();
    })

    const frameRef = page.frameLocator('[id=iframeResult]');
    await frameRef.locator("//button[text()='Try it']").click();
    await page.waitForTimeout(3000)

    await expect(frameRef.locator(`//p[@id="demo"]`)).toHaveText("You pressed OK!")
    await page.waitForTimeout(3000)
})