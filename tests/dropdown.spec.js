const { test, expect } = require('@playwright/test');
const { log } = require('console');

test("Select value from dropdown", async ({ page }) => {

    await page.goto("https://freelance-learn-automation.vercel.app/signup");

    await page.locator("#state").selectOption({ label: 'Assam' });

    // await page.waitForTimeout(3000);

    await page.locator("#state").selectOption({ value: "Karnataka" });

    // await page.waitForTimeout(3000);

    await page.locator("#state").selectOption({ index: 10 });

    // await page.waitForTimeout(3000);

    let state = await page.locator("#state").textContent();

    console.log(state);

    expect(state.includes("Rajasthan")).toBeTruthy();





    let state2 = await page.$("#state");

    let allOptions = await state2.$$("option");

    let status = false;

    for (let i = 0; i < allOptions.length; i++) {

        let element = allOptions[i];

        let value = await element.textContent();

        if (value.includes("Andaman and Nicobar Islands")) {
            status = true;
            break;
        }
    }

    expect(status).toBeTruthy();

    //Multi Select


    await page.locator("#hobbies").selectOption(['Playing','Swimming']);


    await page.waitForTimeout(3000);

})