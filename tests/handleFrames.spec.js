import {test,expect} from "@playwright/test";

test("Handel Frame", async({page})=>{
    await page.goto("https://docs.oracle.com/javase/8/docs/api/");

    const iFrame =   await page.frameLocator("frame[name='packageListFrame']");

    await iFrame.locator("a:has-text('java.awt.color')").click();

    await page.pause();

})