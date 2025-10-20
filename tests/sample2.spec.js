import { test, expect } from "@playwright/test";
import { link } from "fs";

// test.use({viewport:{width:1920,height:1080}});

test("Sample test", async ({ page }) => {
    expect("Mohd Moin").toContain("moin");
})

test("Sample 2 test", async ({ page }) => {
    expect("Moin" - 2).toBeNaN();
})

test("Verify App Title", async ({ page }) => {
    await page.goto("http://www.google.com/");

    const title = await page.title();
    console.log(await page.title());

    console.log(title);

    expect(title).toBe("Google");

    expect(page).toHaveTitle("Google");

    expect(page).toHaveURL(/google/);
})


test("Login in Orange Hrm", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder("Username").fill("Admin");

    await page.locator("input[type='password']").fill("admin123");

    await page.locator("button:has-text('Login')").click();

    expect(page).toHaveURL(/dashboard/);

    await page.getByAltText("profile picture").first().click();

    await page.locator("//a[contains(@href,'logout')]").click();

    expect(page).toHaveURL(/login/);
})

test("Verify Error Message", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder("Username").fill("Admin");

    await page.locator("input[type='password']").fill("admin12");

    await page.locator("button:has-text('Login')").click();

    const errorMsg = await page.locator("(//div[@class='orangehrm-login-error']//p)[1]").textContent();

    console.log(`Error Msg is ${errorMsg}`);

    expect(errorMsg).toContain("Invalid");

    expect(errorMsg).toEqual("Invalid credentials");

    await page.locator("(//div[@class='orangehrm-login-error']//p)[1]").screenshot({ path: "./screenshots/ErrorMsg3.png" });

    //     const errorMsgElem = page.locator("(//div[@class='orangehrm-login-error']//p)[1]");
    // await errorMsgElem.waitFor({ state: 'visible' });
    // await errorMsgElem.screenshot({ path: 'screenshots/ErrorMsg.png' });
})

test("Retry test case", async ({ page }) => {

    await expect(22).toBe(20);

})


test("Dropdown in playwright", async ({ page }) => {

    await page.goto("https://freelance-learn-automation.vercel.app/signup");

    await page.locator("#state").selectOption("Mizoram");

    // await page.waitForTimeout(1000);

    //Value

    await page.locator("#state").selectOption({ value: "Manipur" });
    // await page.waitForTimeout(1000);

    //index

    await page.locator("#state").selectOption({ index: 5 });
    // await page.waitForTimeout(1000);


    // await page.locator("#hobbies").selectOption(["Playing", "Swimming", "Reading"]);

    await page.locator("#hobbies").selectOption([
        { label: "Playing" },
        { value: "Singing" },
        { index: 5 }
    ])
    // await page.waitForTimeout(3000);


    const state = await page.locator("#state");

    const allOps = await state.locator("option");

    const statesString = await allOps.allTextContents();

    console.log(statesString);

    await expect(statesString.includes("Andhra Pradesh")).toBeTruthy();

    const statesString2 = await state.textContent();
    await expect(statesString2.includes("Daman and Diu")).toBeTruthy();

    const state1 = await page.$("#state");

    const arrState = await state1.$$("option");

    let flag = false;
    for (let i of arrState) {

        let value = await i.textContent();
        if (value === "Karnataka") {
            flag = true;
        }

    }
    expect(flag).toBeTruthy();

    const allTextContents = await page.locator("#state").locator("option").allTextContents()

    console.log(allTextContents);

})

test("Upload files", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/#");

    await page.locator("#singleFileInput").setInputFiles("./uploads/Img2.jpg");

    await page.getByRole("button", { name: "Upload Single File" }).click();

    expect(await page.locator("#singleFileStatus")).toContainText("Single file selected");

    await page.locator("#multipleFilesInput").setInputFiles(["./uploads/Img1.jpg", "./uploads/Img3.JPG"]);

    await page.getByRole("button", { name: "Upload Multiple Files" }).click();

    expect(await page.locator("#multipleFilesStatus")).toContainText("Multiple files selected")


})

test("Keyboard Actions", async ({ page }) => {
    await page.goto("https://www.google.com/");

    await page.locator("textarea[name='q']").focus();

    await page.keyboard.type("Playwright Dev");

    // await page.waitForTimeout(3000);

    await page.keyboard.down("Shift");

    for (let i = 0; i < 3; i++) {

        await page.keyboard.press("ArrowLeft");
        // await page.waitForTimeout(500);
    }
    await page.keyboard.up("Shift");

    await page.keyboard.press("Control+C");

    // await page.waitForTimeout(1000);

    await page.keyboard.type("Automation ");

    // await page.waitForTimeout(1000);

    await page.keyboard.press("Control+V");

    await page.waitForTimeout(3000);

    await page.keyboard.press("Enter");
})

test("Auto Suggestions handling", async ({ page }) => {
    await page.goto("https://www.google.com/");
    await page.locator("//textarea[@name='q']").fill("Playwright");

    await page.waitForSelector("//li[@role='presentation']");

    const elements = await page.$$("//li[@role='presentation']");

    for (let i of elements) {
        const value = await i.textContent();

        if (value.includes("mcp server")) {
            await i.click();
            break;
        }
    }

    await page.waitForTimeout(3000);
})

test("Drag and Drop", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/#");

    await page.dragAndDrop("#draggable", "#droppable");

    await page.waitForTimeout(5000);
})

test("Alerts Handling", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");

    await page.on("dialog", async (dialogWin) => {
        var type = await dialogWin.type();

        console.log(`Alert Type: ${type}`);

        const msg = await dialogWin.message();
        console.log(`Message :${msg}`);

        await dialogWin.accept();

    })

    await page.locator("#alertBtn").click();

    // await page.waitForTimeout(3000);
})

test("Confirm Alert", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/#");

    //Confirm alert

    page.on("dialog", async (dialogWin2) => {
        var type = dialogWin2.type();
        console.log(`Alert type: ${type}`);

        var message = dialogWin2.message();
        console.log(`Message : ${message}`);

        dialogWin2.dismiss();

    })

    await page.locator("#confirmBtn").click();
})

test("Prompt Alert", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/#");

    page.on("dialog", (dialogwin3) => {
        const type = dialogwin3.type();
        console.log(`Type : ${type}`);

        const message = dialogwin3.message();
        console.log(`Message: ${message}`);

        dialogwin3.accept("Mohd Moin");

    })

    await page.locator("#promptBtn").click();

    const status = await page.locator("#demo");
    await expect(status).toContainText("Mohd Moin");

    const status2 = await page.locator("#demo").textContent();
    await expect(status2).toContain("Mohd Moin");

    const status3 = await page.locator("#demo");
    await expect(status3).toHaveText("Hello Mohd Moin! How are you today?")

})


test("Frames handling", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame_1 = await page.frameLocator("//frame[@src='frame_1.html']");

    await frame_1.locator("input[name='mytext1']").fill("Moin");

    // await frame_1.fill("input[name='mytext1']","Mohd");
    // await page.waitForTimeout(2000);

    const frame_2 = await page.frameLocator("//frame[@src='frame_2.html']");

    await frame_2.locator("input[name='mytext2']").fill("Moin");

    // await page.waitForTimeout(2000);

    await frame_1.locator("input[name='mytext1']").focus();
    const frame_3 = await page.frameLocator("//frame[@src='frame_3.html']");

    const nestedFrame = await frame_3.frameLocator("//iframe[contains(@src,'google.com')]");

    await nestedFrame.locator("//span[text()='I am a human']").click();

    // await page.waitForTimeout(2000);

    await page.frameLocator("//frame[@src='frame_4.html']").locator("input[name='mytext4']").fill("Mohammad");

    await page.waitForTimeout(2000);

})

test("Handling iFrames using frame() function", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame1 = await page.frame({ url: /.*frame_1.*/ });
    // const frame2 = await page.frame({name:"frame1"});

    await frame1.fill("input[name='mytext1']", "Mohd");

    // await frame2.fill("input[name='mytext1']","ABCD");

    await page.keyboard.press("Control+A");

    await page.waitForTimeout(3000);
})

test("Multiple tabs", async ({ browser }) => {
    const context = await browser.newContext();

    const mainPage = await context.newPage();

    await mainPage.goto("https://freelance-learn-automation.vercel.app/signup");

    const [twitterPage] = await Promise.all(
        [
            context.waitForEvent("page"),

            mainPage.locator("//a[contains(@href,'twitter')]").click()
        ]
    )

    await twitterPage.locator("//a[@href='/login']").click();
    await twitterPage.locator("//input[@autocomplete='username']").fill("avdcs");
    await twitterPage.waitForTimeout(3000);

    await mainPage.bringToFront();

    await mainPage.waitForTimeout(2000);

    const [facebookPage] = await Promise.all(
        [
            context.waitForEvent("page"),
            mainPage.locator("//a[contains(@href,'facebook')]").click()
        ]
    )

    await facebookPage.waitForTimeout(2000);

    await facebookPage.locator("//span[normalize-space()='Email address or phone number']/following-sibling::input[@name='email']").fill("shaikmoin2060@gmail.com");

    await facebookPage.locator("//span[normalize-space()='Password']/following-sibling::input[@name='pass']").fill("76326336@M");

    await facebookPage.locator("(//div[@aria-label='Log in to Facebook' and @role='button']//span[normalize-space()='Log in'])[1]").click();

    await facebookPage.waitForTimeout(2000);
})


test("Network call", async ({ page }) => {
    await page.goto("https://www.facebook.com");

    await page.locator("//a[@href='/r.php?entry_point=login']").click();

    await page.waitForLoadState("networkidle");

    const inputs = await page.locator("//input[@type='text']").count();

    await expect(inputs).toBe(6);

})

import loginData  from "../JsonFiles/loginData.json" assert {type:"json"}

test("Register using data from JSON", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login");

    await page.locator("#email1").fill(loginData.email);

    await page.locator("#password1").fill(loginData.password);

    // await page.pause();

    await page.getByRole("button", { name: "Sign in" }).click();

    await page.waitForTimeout(3000);

    await expect(page.locator(".cartBtn")).toHaveRole("button");
    await expect(page.locator(".cartBtn")).toBeVisible();
})


import loginData1 from  "../JsonFiles/loginDataMultipleUsers.json" assert {type:'json'}

test.describe("Login into App using multiple users Data driven testing",()=>{

for(const data of loginData1){

    test.describe(`Login with user: ${data.id}`, ()=>{

        test("Login to App", async({page})=>{
            await page.goto("https://freelance-learn-automation.vercel.app/login");

            await page.locator("#email1").fill(data.email);

            await page.locator("input[name='password1']").fill(data.password);

            await page.getByRole("button",{name:"Sign in"}).click();

          await  expect(page.locator(".cartBtn")).toBeVisible();

        })
    })
}

})