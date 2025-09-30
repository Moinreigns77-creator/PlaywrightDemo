import { test, expect } from "@playwright/test";


const LoginPage = require("../pages/login");
const HomePage = require("../pages/homepage");

test("Logging Into Application", async ({ page }) => {

  await page.goto("https://freelance-learn-automation.vercel.app/login")
  const loginPage = new LoginPage(page);

  await loginPage.loginToApplication();

  await loginPage.verifyLogin();

 const homePage=  new HomePage(page);

 await homePage.signoutFromApp();

 await homePage.verifySignout();


})