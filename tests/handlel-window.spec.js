import { test, expect } from "@playwright/test"

test("Handle Windows/Tabs", async ({ browser }) => {

    const context = await browser.newContext();

    //Open main page
    const mainPage = await context.newPage();
    await mainPage.goto("https://freelance-learn-automation.vercel.app/login");

    //open fbPage
   const [fbPage] = await Promise.all(
        [
            context.waitForEvent("page"),
            mainPage.locator("(//a[contains(@href,'facebook')])[1]").click()
        ]
    )

    //work on fbPage
    await fbPage.locator("(//input[@name='email'])[2]").fill("admin@gmail.com");

    // await fbPage.close();
   await fbPage.waitForTimeout(2000);


    //work on main page
    await mainPage.bringToFront();
    await mainPage.locator("#email1").fill("moin@gmail.com");

   await mainPage.waitForTimeout(2000);

    //again went back work on fbPage
    await fbPage.bringToFront();

    await fbPage.locator("(//input[@name='pass'])[2]").fill('abcd');

    await fbPage.waitForTimeout(2000);
    await fbPage.close();

    await mainPage.waitForTimeout(2000);
    await mainPage.close();


})