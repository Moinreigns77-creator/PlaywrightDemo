const {test,expect} = require("@playwright/test");

test("Verify Error Message", async ({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder('username').fill("Admin");

    await page.getByPlaceholder('password').fill("admin");

    await page.locator("//button[contains(.,'Login')]").click();

    const errorMsg =  await page.locator("//p[contains(@class,'oxd-alert-content-text')]").textContent();

    console.log(`Error message is ${errorMsg}`);

  //  expect(errorMsg.includes('Invalid')).toBeTruthy();

    expect(errorMsg==='Invalid credentials').toBeTruthy();

})