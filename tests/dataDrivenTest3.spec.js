import {test,expect} from "@playwright/test";

const testdata = require("../loginData.json");

test.describe("Testing for login with multiple users", function(){

    for(let data of testdata){

        test.describe(`Tesing with user ${data.id}`, function(){

            test("Login into application", async({page})=>{

                await page.goto("https://freelance-learn-automation.vercel.app/login");

                await page.getByPlaceholder("Enter Email").fill(data.username);
                await page.getByPlaceholder("Enter Password").fill(data.password)

                
            })

        })

    }

})

