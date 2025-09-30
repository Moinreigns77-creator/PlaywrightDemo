const {test,expect}=require('@playwright/test');

test("Keyboard actions", async({page})=>{

    await page.goto("https://www.google.com/");

    await page.locator("//textarea[@name='q']").focus();

    await page.keyboard.type("Learn Code with Durgesh");

    //await page.keyboard.press("Enter");
 
    //await page.waitForTimeout(3000);

    await page.keyboard.down("Shift");

    for(let i=0; i<'durgesh'.length;i++){
        await page.keyboard.press("ArrowLeft");
    }

    await page.keyboard.up("Shift");

    await page.keyboard.press("Control+C");

    await page.keyboard.press("Backspace");

    await page.keyboard.type(":");

    await page.keyboard.press("Control+V");

    await page.waitForTimeout(3000);
})