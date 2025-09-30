import { test, expect } from "@playwright/test";

test("Handling IFrames", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame_1 = await page.frameLocator("frame[src='frame_1.html']");

    await frame_1.locator("input[name='mytext1']").fill("Assalamualikum Wa rahmatullahi Wa barkatuhu");

    await page.waitForTimeout(3000);



})

test("Frame inside an Iframe", async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame_3 = await page.frameLocator("frame[src='frame_3.html']");

    await frame_3.locator("input[name='mytext3']").fill("Walikumassalam");

    // await page.waitForTimeout(3000);

    const nestedFrame = await frame_3.frameLocator("iframe[width='650']");

    await nestedFrame.locator("//*[@aria-label='Web Testing']").click();

    await nestedFrame.locator("//label//*[text()='I am a human']").click();

    await nestedFrame.getByRole("listbox").click();
    // await nestedFrame.getByRole("option", { name: "Well, now I know :-)" }).click();
    await nestedFrame.locator("//div[@role='option']//*[text()='Well, now I know :-)']").click({ force: true });
    await page.waitForTimeout(5000);


})