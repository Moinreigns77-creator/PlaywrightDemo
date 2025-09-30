
const {expect} = require("@playwright/test");

class LoginPage{

    constructor (page){
        this.page = page
        this.username= "#email1"
        this.password= "//input[@placeholder='Enter Password']"
        this.loginBtn = "//button[text()='Sign in']"
        this.manageOption = "//div[@class='nav-menu-item-manage']/span[text()='Manage']"
    }


    async loginToApplication(){

        await this.page.fill(this.username ,"admin@email.com");

        await this.page.fill(this.password,"admin@123");

        await this.page.click(this.loginBtn);


    }

    async verifyLogin(){

     await  expect(this.page.locator(this.manageOption)).toBeVisible();
    }

}

module.exports=LoginPage; 