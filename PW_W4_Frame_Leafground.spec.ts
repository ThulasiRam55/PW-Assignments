import { test, expect } from '@playwright/test';

test('Handle Frames in LeafGround', async ({ page }) => {

    // Navigate to the application
    await page.goto('https://leafground.com/frame.xhtml');

    // Frame 1 - Click Me Button
    const frame1 = page.frameLocator('[src="default.xhtml"]');
    const frame1Button = frame1.locator("button[id='Click']");
    await frame1Button.click();
    await expect(frame1Button).toHaveText('Hurray! You Clicked Me.');

    // Total number of frames
    const totalFrames = page.frames().length;
    console.log("Total Frames : ", totalFrames);

    // Nested Frames    
    const outerFrame = page.frameLocator('[src="page.xhtml"]');
    const innerFrame = outerFrame.frameLocator('[id="frame2"]');
    const nestedButton = innerFrame.locator("button[id='Click']");
    await nestedButton.click();
    await expect(nestedButton).toHaveText('Hurray! You Clicked Me.');
    await page.waitForTimeout(3000);
});