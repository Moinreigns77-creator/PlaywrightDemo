import {expect} from "@playwright/test";


class RegisterPage {

    constructor(page) {
        this.page = page
        this.name = "#name"
        this.email = "#email"
        this.password = "#password"
        this.interests = "//div[@class='interest-div']//label"
        this.gender = "//input[@name='gender']"
        this.state = "#state"
        this.hobbies = "#hobbies"
        this.submitBtn = "//button[text()='Sign up']"
    }


    async registerUser(name, email, password, interests, gender, state, hobbies) {

        await this.page.fill(this.name, name);

        await this.page.fill(this.email, email);

        await this.page.fill(this.password, password);

        for (let i of interests) {
            const checkbox = this.page.locator(`label:has-text('${i}')`);
            if (await checkbox.count() === 0) {
                console.warn(`Interest not found: ${i}`);
                continue;
            }
            await checkbox.click();
        }

        if (gender === "Male" || gender === "Female" ) {
            await this.page.locator(`//input[@value='${gender}']`).click();
        }else{
            console.warn(`Gender is Invalid : ${gender}`);
            
        }

        await this.page.selectOption(this.state,state);

        await this.page.selectOption(this.hobbies,hobbies);

        await this.page.click(this.submitBtn);
    }

    async verifyRegistration(){
        await expect(this.page.locator("//h2[@class='header'][text()='Sign In']")).toBeVisible();
    }
}

module.exports=RegisterPage;