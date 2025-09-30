import { test, expect } from "@playwright/test";
import { statSync } from "fs";


test("Handle Alert Box", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/#");

    await page.on("dialog", async(dialogWindow)=>{

        expect(dialogWindow.type()).toContain("alert");

        //toContain() searches for substringS
        expect(dialogWindow.message()).toContain("I am an alert box")

        dialogWindow.accept();
    })

    await page.locator("button:has-text('Simple Alert')").click();

    await page.waitForTimeout(3000);

})


test("Handle Confrim Box",async({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/#");

    await page.on("dialog", async(dialogWindow)=>{

        expect(dialogWindow.type()).toContain("confirm");

        console.log(`Type is ${dialogWindow.type()}`);
        
        expect(dialogWindow.message()).toContain("Press a button!");

        console.log(`Message is ${dialogWindow.message()}`);
        

        let res =await dialogWindow.accept();

        console.log(res);
    })


        await page.locator("button:has-text('Confirmation Alert')").click();

        //check whether accepted or dismissed.

        let status = await page.locator("#demo").textContent();

        console.log(status);
        expect(status).toBe("You pressed OK!");
})


test("Handle Prompt Box", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/#");
    await page.on("dialog",async(dialogWindow)=>{
        expect(dialogWindow.type()).toBe('prompt');
        expect(dialogWindow.message()).toBe('Please enter your name:');

        await dialogWindow.accept("Mohd Moin");
    })

    await page.locator("button:has-text('Prompt Alert')").click()

    let status = await page.locator("#demo").textContent();

    expect(status).toBe("Hello Mohd Moin! How are you today?")
})