import { test, expect } from "@playwright/test";

const data = JSON.parse(JSON.stringify(require("../testdata.json")))


test("Getting test data from JSON", async ({ page }) => {

    await page.goto("https://freelance-learn-automation.vercel.app/login"),

    await page.locator("//input[@id='email1']").fill(data.username);

    await page.locator("//input[@id='password1']").fill(data.password);

    await page.pause();


})