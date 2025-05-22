import { chromium, expect, test } from "@playwright/test";

test('Handling alert with input',async({page})=>{
    // - Interact with the Click Me button inside frame 
    await page.goto("https://leafground.com/frame.xhtml")
    // - Assert the text changed after clicking the button 
    await expect(page.frameLocator("(//iframe)[1]").locator("(//button[text()='Click Me'])[1]")).toHaveText("Click Me")
    await page.frameLocator("(//iframe)[1]").locator("(//button[text()='Click Me'])[1]").click()
    await expect(page.frameLocator("(//iframe)[1]").locator("(//button[text()='Hurray! You Clicked Me.'])[1]")).toHaveText("Hurray! You Clicked Me.")
    // - Get the total count of frames present in the page
    console.log(page.frames().length)
    // - Interact with the Click Me button present inside the nested frames
    await page.frameLocator("(//iframe)[3]").frameLocator("#frame2").locator("(//button[text()='Click Me'])[1]").click()
    // - Assert the text changed after clicking the button
    await expect(page.frameLocator("(//iframe)[3]").frameLocator("#frame2").locator("(//button[text()='Hurray! You Clicked Me.'])[1]")).toHaveText("Hurray! You Clicked Me.")
})
