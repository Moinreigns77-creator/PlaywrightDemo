import { test, expect } from "@playwright/test";

test("Sample Alert", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");

    await page.on("dialog", async (dialogWin) => {
        const type = await dialogWin.type();
        console.log(`Type is ${type}`);
        expect(type).toBe('alert');
        expect(dialogWin.message()).toBe("I am an alert box!");

        await dialogWin.accept();
    })

    await page.locator("#alertBtn").click();


})


test("Confirmation Alert", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");

    await page.on("dialog", async (dialogWin) => {

        const type = await dialogWin.type();
        console.log(`Type is ${type}`);

        expect(dialogWin.message()).toBe("Press a button!");
        expect(type).toBe("confirm");

        await dialogWin.dismiss();
        const status = await page.locator("#demo").textContent();
        expect(status).toBe("You pressed Cancel!");
    })

    await page.locator("button:has-text('Confirmation Alert')").click();

})


test("Prompt Alert", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/#");

    await page.on("dialog", async (dialogbox) => {

        const type = await dialogbox.type();
        console.log(`Type is ${type}`);
        expect(type).toBe("prompt");

        expect(dialogbox.message()).toBe("Please enter your name:");

        dialogbox.accept("Mohd Moin");
        const status = await page.locator("#demo").textContent();
        expect(status.includes("Mohd Moin")).toBeTruthy();
    })
    await page.locator("button:has-text('Prompt Alert')").click();
})