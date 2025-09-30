import { test, expect } from 'playwright/test';


test("Verify Application Title by Keyboard", async ({ page }) => {
    await page.goto("http://www.google.com");

    await page.locator("textarea[name='q']").fill("Mukesh Otwani")

    await page.waitForTimeout(1000);

    await page.keyboard.press("ArrowDown");

    await page.waitForTimeout(1000);

    await page.keyboard.press("ArrowDown")
    
    await page.waitForTimeout(1000);

    await page.keyboard.press("Enter");

    await page.waitForTimeout(3000);

})

test("Verify Application Title by Loop", async ({ page }) => {

    await page.goto("http://www.google.com");

    await page.locator("textarea[name='q']").fill("Mukesh Otwani");

    await page.waitForTimeout(3000);

    await page.waitForSelector("//li[@role='presentation']");

    const elements = await page.$$("//li[@role='presentation']");

    for (let i = 0; i < elements.length; i++) {
        let text = await elements[i].textContent();

        if (text.includes("youtube")) {
            await elements[i].click();
            break;
        }

    }
    await page.waitForTimeout(3000);


})