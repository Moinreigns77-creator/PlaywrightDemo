
const {expect} = require("@playwright/test")

class HomePage{

    constructor(page)
    {
        this.page = page;
        this.menuOption = "//img[@alt='menu']"
        this.signoutOption = "//button[text()='Sign out']"
        this.header="//h2[text()='Sign In']"
    }

    async signoutFromApp(){
        await this.page.click(this.menuOption);

        await this.page.click(this.signoutOption);
    }

    async verifySignout(){

        await expect(this.page.locator(this.header)).toBeVisible();
    }
}

module.exports=HomePage;