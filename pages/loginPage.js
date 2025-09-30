import { expect } from "@playwright/test";

class LoginPage {

    constructor(page) {
        this.page = page
        this.email = "#email1"
        this.password = "#password1"
        this.loginBtn = "//button[@class='submit-btn']"
        this.cartBtn = "//button[@class='cartBtn']"
    }


    async loginToApp(email, password) {

        await this.page.fill(this.email, email);

        await this.page.fill(this.password, password);

        await this.page.click(this.loginBtn);
    }

    async verifySuccessfulLogin() {
        await expect(this.page.locator("//button[@class='cartBtn']")).toBeVisible();

    }

}

module.exports = LoginPage;