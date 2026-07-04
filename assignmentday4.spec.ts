import { test, chromium, firefox } from "@playwright/test";

test("Launch Edge and Firefox", async () => {
  const edgeBrowser = await chromium.launch({channel: "msedge", headless: false});
  const edgeContext = await edgeBrowser.newContext();
  const edgePage = await edgeContext.newPage();
  await edgePage.goto("https://www.redbus.in");

  console.log("===== RedBus in Edge =====");
  console.log("Title :", await edgePage.title());
  console.log("URL   :", edgePage.url());

  const firefoxBrowser = await firefox.launch({headless: false});
  const firefoxContext = await firefoxBrowser.newContext();
  const firefoxPage = await firefoxContext.newPage();
  await firefoxPage.goto("https://www.flipkart.com");

  console.log("\n===== Flipkart in Firefox =====");
  console.log("Title :", await firefoxPage.title());
  console.log("URL   :", firefoxPage.url());

  await edgePage.waitForTimeout(5000);
  await firefoxPage.waitForTimeout(5000);

  await edgeBrowser.close();
  await firefoxBrowser.close();
});