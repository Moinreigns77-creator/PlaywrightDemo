import {test,expect} from "@playwright/test";

const RegisterPage = require("../pages/registerPage");

const registerData = require("../registerData.json");

test.describe("Register Functionality using multiple users", function(){

    for(const data of registerData){

        test.describe(`Register with user: ${data.id}`, function(){

            test("Register to Application", async({page})=>{

                await page.goto("https://freelance-learn-automation.vercel.app/signup");

               const registerPage = new RegisterPage(page);

               await registerPage.registerUser(data.name,data.email,data.password,data.interests,data.gender,data.state,data.hobbies);

               await registerPage.verifyRegistration();
            })


        })
    }


})