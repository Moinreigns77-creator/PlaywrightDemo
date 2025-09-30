//const {test,expect} = require('@playwright/test');

import {test,expect} from '@playwright/test';

test("My First test", async function({page}){
   
    expect(10).toBe(10);

})

test.skip("My Second test", async function ({page}){
    expect(100).toBe(101);
})

test("My Third test", async function({page}){
    expect(10<20).toBeTruthy();
})

test("My fourth test", async  ({page})=> {
    expect("Mohd Moin".includes("Moin")).toBeTruthy();
}) 