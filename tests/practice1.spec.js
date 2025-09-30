import { test, expect } from '@playwright/test';
import { log } from 'node:console';
import { stat, statSync } from 'node:fs';
import path from 'node:path';
import { text } from 'node:stream/consumers';

test("Sample Login with verification", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("//input[@name='username']").fill("Admin");

    await page.locator("//input[@name='password']").fill("admin123");

    await page.locator("//button[contains(@class,'orangehrm-login-button')]").click();

    let url = await page.url();

    console.log(url);

    expect(page).toHaveURL(/dashboard/);


})

test("Logout functionality", async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[name='username']").fill("Admin", { delay: 500 });

    await page.locator("input[name='password']").fill("admin123", { delay: 500 });

    await page.locator("xpath=//button[normalize-space()='Login']").click();

    expect(page).toHaveURL(/dashboard/);

    await page.locator("img[alt='profile picture'][class='oxd-userdropdown-img']").click();

    await page.getByRole('menuitem', { name: 'Logout' }).click();

    expect(page).toHaveURL(/login/);

})

test("Invalid Cred Error Msg", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[name='username']").fill("Admin");

    await page.locator("input[name='password']").fill("Admin");

    await page.locator("xpath=//button[normalize-space()='Login']").click();

    await page.waitForTimeout(5000);

    await expect(page.locator("//p[normalize-space()='Invalid credentials']")).toBeVisible();
    expect(page.locator("xpath=//p[normalize-space()='Invalid credentials']")).toHaveText('Invalid credentials');


})


test("Dropdown test", async ({ page }) => {

    await page.goto("https://freelance-learn-automation.vercel.app/signup");

    let state = await page.locator("#state");

    await state.selectOption({ "label": "Karnataka" });

    // await page.waitForTimeout(5000);

    //all() method is used
    let allOptions = await state.locator("option").all();

    let length = allOptions.length;

    let isContain = false;
    for (let i = 0; i < length; i++) {

        let element = await allOptions[i];

        let value = await element.textContent();

        // console.log(value);
        if (value === 'Rajasthan') {
            isContain = true;
        }

    }

    expect(isContain).toBeTruthy();


    //Using allTextContents()
    let values = await state.locator("option").allTextContents();

    console.log(values);

    expect(values).toContain("Assam");

    //Using map functions

    let values2 = await state.locator("option").evaluateAll(opts =>
        opts.map(opt =>
            opt.textContent?.trim()
        )
    )

    expect(values2).toContain("Punjab");


})

test("Dropdown 2", async ({ page }) => {

    await page.goto("https://freelance-learn-automation.vercel.app/signup");

    const state = await page.locator("#state");

    await state.selectOption({ label: "Manipur" });

    await page.waitForTimeout(3000);

    let allOps = await state.locator("option").all();

    console.log(allOps.length);

    for (let i = 0; i < allOps.length; i++) {

        let element = await allOps[i].textContent();

        console.log(element);

    }

    let res = await state.locator("option").allTextContents()

    console.log(res);
    console.log(typeof res);

    expect(res.includes('Manipur')).toBeTruthy();

})

test("Dropdown multi select", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/signup");

    await page.locator("select[name='hobbies']").selectOption([{ index: 2 }, { index: 3 }]);

    await page.waitForTimeout(5000);
})

test("Checkbox ", async ({ page }) => {


    await page.goto("https://freelance-learn-automation.vercel.app/signup");

    await page.getByLabel('Java').click();

    await page.getByLabel('SQL').click();

    await page.waitForTimeout(3000);
})


test("Mouse hover", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator(".dropbtn").hover();
    await page.waitForTimeout(3000);
    await page.locator("//a[normalize-space()='Mobiles']").click();

    await page.waitForTimeout(3000);
    await page.locator(".dropbtn").hover();
    await page.waitForTimeout(3000);
    await page.locator("a:has-text('Laptops')").click();

    await page.waitForTimeout(3000);

})

test("Keyboard actions", async ({ page }) => {

    await page.goto("http://www.google.com/");

    await page.locator("textarea[name='q']").focus();

    await page.keyboard.type("Playwright Dev");
    await page.waitForTimeout(1000);

    await page.keyboard.down("Shift");
    await page.waitForTimeout(1000);

    for (let i = 0; i < "dev".length; i++) {
        await page.keyboard.press("ArrowLeft");
    }
    await page.waitForTimeout(1000);

    await page.keyboard.up("Shift");
    await page.waitForTimeout(1000);

    await page.keyboard.press("Backspace");
    await page.waitForTimeout(1000);

    await page.keyboard.type("javascript");
    await page.waitForTimeout(1000);

    await page.keyboard.press("Enter");

    await page.waitForTimeout(3000);

})


test("Single File  Upload", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com");

    await page.locator("#singleFileInput").setInputFiles("./uploads/Img1.jpg");

    await page.locator("button[type='submit']:has-text('Upload Single File')").click();

    await page.waitForTimeout(3000);

    let status = await page.locator("#singleFileStatus").textContent();

    expect(status.includes("Single file selected")).toBeTruthy();



})

test("Multiple File Upload", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com");

    await page.locator("#multipleFilesInput").setInputFiles(["./uploads/Img1.jpg","./uploads/Img2.jpg","./uploads/Img3.jpg"]);

    await page.locator("button[type='submit']:has-text('Upload Multiple Files')").click();

    let status= await page.locator("#multipleFilesStatus").textContent();

    expect(status.includes('Multiple')).toBeTruthy();



})

