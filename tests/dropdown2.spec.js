const {test,expect}=require('@playwright/test');
const { log } = require('console');

test("Validating the state in dropdown",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

     await page.locator('//select[@id="country"]').click();

    await page.locator('//select[@id="country"]').selectOption({label:'Canada'});

    await page.waitForTimeout(3000);

    //Method 2

    const country =await page.$("#country");

    const allElem = await country.$$("option");

    for(let i=0; i<allElem.length;i++){

        let element = allElem[i];

        let value = await element.textContent();

        console.log(value);
        
    }


    console.log("------------------------------------------------");


    const allELems =await page.$$eval("#country option", opts=>{
      return  opts.map(opt =>{
          return  opt.textContent.trim();
        })
    });

    console.log(allELems);
    
})