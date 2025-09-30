import { test, expect } from "@playwright/test";
/*✅ Effect: You get a clone of the cached object.*/
//const testdata = JSON.parse(JSON.stringify(require("../loginData.json")))
// const testdata = require("../loginData.json")

/*✅ Reads the file fresh from disk every time.
  ✅ Always reflects the latest updates in the JSON file.*/
const fs = require("fs");
const testdata = JSON.parse(fs.readFileSync("./loginData.json"));

test.describe("Data driven test for multiple user", function () {


    for (const data of testdata) {

        test.describe(`Login with user ${data.id}`, function () {

            test("Login into application", async ({ page }) => {

                await page.goto("https://freelance-learn-automation.vercel.app/login");

                await page.locator("#email1").fill(data.username);

                await page.locator("#password1").fill(data.password);



            })
        })
    }
})