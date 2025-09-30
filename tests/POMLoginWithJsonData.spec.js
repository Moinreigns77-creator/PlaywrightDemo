import { test,expect } from "@playwright/test";

const LoginPage = require("../pages/loginPage");

const loginData = require("../loginData.json")


test.describe("Login into Application with multiple users", function(){

    for(let data of loginData){

        test.describe(`Login with user : ${data.id}`, function(){

            test("Login into App", async({page})=>{

                await page.goto("https://freelance-learn-automation.vercel.app/login");

               const loginPage = await new LoginPage(page);
                
               await loginPage.loginToApp(data.email,data.password);
               await loginPage.verifySuccessfulLogin();
            
            
            })
        })

    }



})