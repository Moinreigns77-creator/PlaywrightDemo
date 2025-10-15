import { test, expect } from "@playwright/test";

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

