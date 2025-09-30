import { test, expect } from "@playwright/test"

test("Handle with Load State", async ({ page }) => {

    await page.goto("https://freelance-learn-automation.vercel.app/login"),

    await page.locator("//a[text()='New user? Signup']").click();

    await page.waitForLoadState("networkidle");

    const count = await page.locator("//input[@type='checkbox']").count();

    expect(count).toBe(7);

})