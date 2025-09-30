const {test,expect} = require('@playwright/test');

test("Validate Login Functionality", async ({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByPlaceholder('Username').fill('Admin');

    await page.locator("input[type='password']").fill('admin123');

    await page.locator("//button[normalize-space()='Login']").click();

    await expect(page).toHaveURL(/dashboard/);

    // await page.waitForTimeout(5000);

    //Logout functionality

    // await page.getByAltText("profile picture").first().click();
    await page.locator("//img[@alt='profile picture']").nth(0).click();

    await page.getByText("Logout").click();

    await expect(page).toHaveURL(/login/);
})