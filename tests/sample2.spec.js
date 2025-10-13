import { test,expect } from "@playwright/test";

// test.use({viewport:{width:1920,height:1080}});

test("Sample test", async({page})=>{
    expect("Mohd Moin").toContain("moin");
})

test("Sample 2 test", async({page})=>{
    expect("Moin"-2).toBeNaN();
})

test("Verify App Title", async({page})=>{
    await page.goto("http://www.google.com/");

    const title = await page.title();
    console.log(await page.title());
    
   console.log(title);
    
   expect(title).toBe("Google");

   expect(page).toHaveTitle("Google");

   expect(page).toHaveURL(/google/);
})


test("Login in Orange Hrm", async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder("Username").fill("Admin");

    await page.locator("input[type='password']").fill("admin123");

    await page.locator("button:has-text('Login')").click();

    expect(page).toHaveURL(/dashboard/);

    await page.getByAltText("profile picture").first().click();

    await page.locator("//a[contains(@href,'logout')]").click();

    expect(page).toHaveURL(/login/);
})

test.only("Verify Error Message", async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder("Username").fill("Admin");

    await page.locator("input[type='password']").fill("admin12");

    await page.locator("button:has-text('Login')").click();

    const errorMsg = await page.locator("(//div[@class='orangehrm-login-error']//p)[1]").textContent();

    console.log(`Error Msg is ${errorMsg}`);
    
    expect(errorMsg).toContain("Invalid");

    expect(errorMsg).toEqual("Invalid credentials");

    await page.locator("(//div[@class='orangehrm-login-error']//p)[1]").screenshot({path:"./screenshots/ErrorMsg3.png"});

//     const errorMsgElem = page.locator("(//div[@class='orangehrm-login-error']//p)[1]");
// await errorMsgElem.waitFor({ state: 'visible' });
// await errorMsgElem.screenshot({ path: 'screenshots/ErrorMsg.png' });
})