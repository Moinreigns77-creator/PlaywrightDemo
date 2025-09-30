const {test,expect}=require('@playwright/test');

test("Hover and click on the visible option",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("//button[@class='dropbtn']").hover();

        await page.waitForTimeout(5000);


    await page.locator("//a[normalize-space()='Mobiles']").click();

    await page.waitForTimeout(3000);

})