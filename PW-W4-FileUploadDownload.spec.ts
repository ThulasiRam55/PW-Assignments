/// <reference types="node" />

import { test, expect } from '@playwright/test';
import path from 'path';
import fs from "fs";

test('File Upload Download', async ({ page }) => {
    //url
    const url = "https://the-internet.herokuapp.com/";

    // File paths
    const documentPath = path.join(__dirname, "../../../Data/Sample.pdf");
    const imagePath = path.join(__dirname, "../../../Data/TestLeaf Logo.png");

    //Upload xpath
    const uploadInput = page.locator("#file-upload");

    // File Upload
    await page.goto(`${url}upload`);
    await expect(uploadInput).toBeVisible();

    // Upload document without clicking "Choose File"
    await uploadInput.setInputFiles(documentPath);

    // Click Upload button
    await page.locator("#file-submit").click();

    // Verify upload
    await expect(page.locator("h3")).toHaveText("File Uploaded!");
    await expect(page.locator("#uploaded-files")).toHaveText("Sample.pdf");
    console.log("Document uploaded successfully.");
    await page.waitForTimeout(3000)

    //Image upload
    await page.goto(`${url}upload`);
    await expect(uploadInput).toBeVisible();
    await uploadInput.setInputFiles(imagePath);
    await page.locator("#file-submit").click();
    await expect(page.locator("h3")).toHaveText("File Uploaded!");
    await expect(page.locator("#uploaded-files")).toHaveText("TestLeaf Logo.png");
    console.log("Image uploaded successfully.");
    await page.waitForTimeout(3000)

    // File download
    await page.goto(`${url}download`);

    // Wait for download
    const downloadPromise = page.waitForEvent("download");

    // Download file.json
    await page.locator("//a[text()='Sample.pdf']").click();
    const download = await downloadPromise;

    // Save file to Downloads folder
    const downloadPath = path.join(__dirname, "../../../Downloads", "Sample.pdf");
    await download.saveAs(downloadPath);

    // Verify downloaded file exists
    expect(fs.existsSync(downloadPath)).toBeTruthy();
    console.log("Downloaded File:", downloadPath);
    await page.waitForTimeout(3000)
});