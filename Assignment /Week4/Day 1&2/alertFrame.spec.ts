import { chromium, expect, test } from "@playwright/test";

test("Validate Alert & Frame", async ({page}) => {
    page.on('dialog',alertType =>{ 
        const typeofAlert=alertType.type()
        console.log(typeofAlert)
        console.log(alertType.message()) // get the message and print message from dialog box
        if(typeofAlert=="confirm"){
        alertType.accept()
        }else{
        alertType.dismiss()
        }
    })

    await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");
    await page.getByText("Accept all & visit the site").click()
    //option 1
    // const allFrame=page.frames()
    // await allFrame[1].locator("//button[text()='Try it']").click()
    // await expect(allFrame[1].locator("#demo")).toHaveText('You pressed OK!')
    //option 2
    await page.frameLocator("#iframeResult").locator("//button[text()='Try it']").click()
    await expect(page.frameLocator("#iframeResult").locator("#demo")).toHaveText('You pressed OK!')
})
