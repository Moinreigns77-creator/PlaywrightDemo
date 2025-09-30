const {test,expect}=require('@playwright/test');

test("Single File Upload Validation",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#singleFileInput").setInputFiles("./uploads/Img1.jpg");

    await page.locator("//button[@type='submit'][normalize-space()='Upload Single File']").click();

    expect(page.locator("#singleFileStatus")).toHaveText(/single file selected/i);

 }) //Multiple files.

 test("Multiple Files Upload Validation",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

 
    await page.locator("#multipleFilesInput").setInputFiles(["./uploads/Img1.jpg","./uploads/Img2.jpg","./uploads/Img3.jpg"]);

    await page.locator("//button[normalize-space()='Upload Multiple Files']").click();

    expect(await page.locator("#multipleFilesStatus")).toHaveText(/Multiple files selected:/);

})