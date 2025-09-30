import { test, expect } from "@playwright/test"
import { link } from "fs";

test("Multiple tabs", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://freelance-learn-automation.vercel.app/login");
    await page.locator("a:has-text('New user? Signup')").click();



    const [xPage] = await Promise.all(
        [
            context.waitForEvent("page"),
            page.locator("//a[contains(@href,'twitter.com')]").click()
        ]
    )

    await xPage.locator("//a[@data-testid='login']").click();

    await xPage.locator("//input[@autocomplete='username']").fill("Mohd.moin@gmail.com")

    await xPage.keyboard.down("Control");
    await xPage.keyboard.press("A");
    await xPage.keyboard.up("Control")

    await xPage.keyboard.down("Control");
    await xPage.keyboard.press("C");
    await xPage.keyboard.up("Control")
    await xPage.waitForTimeout(1000);

    await xPage.keyboard.press("ArrowRight");

    await xPage.keyboard.press("Space");

    await xPage.waitForTimeout(1000);


    await xPage.keyboard.down("Control");
    await xPage.keyboard.press("V");
    await xPage.keyboard.up("Control")

    await xPage.waitForTimeout(3000);


})