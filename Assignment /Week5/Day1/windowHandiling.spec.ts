
import test, { expect } from "@playwright/test";

test.only("To Merge Lead with window handling", async ({page,context}) => {

    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.locator("//input[@id='username']").fill("DemoSalesManager")
    await page.locator("//input[@type='password']").fill("crmsfa")
    await page.locator("//input[@value='Login']").click()
    //Click CRM/SFA link
    await page.locator("//div[@id='button']").click()
    //Click Leads link
    await page.locator("//div//a[text()='Leads']").click()
    // Click Merge Leads
    await page.locator("//a[text()='Merge Leads']").click()
    // - Click From Lead widget and Select the first resulting lead id - window handling
    const [fristLeadWindow] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("(//a//img[@alt='Lookup'])[1]").click()
    ])
    const allpages = fristLeadWindow.context().pages()
    console.log(allpages.length)
    await page.waitForTimeout(6000)
    await allpages[1].locator("(//div//a[@class='linktext'])[1]").click()
    // - Click To Lead widget and Select the second resulting lead id -//div//a[@class='linktext'].nth(1)- window handling
    const [secondLeadWindow] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("(//a//img[@alt='Lookup'])[2]").click()
    ])
    const allpages1 = secondLeadWindow.context().pages()
    console.log(allpages1.length)
    await allpages1[1].locator("(//div//a[@class='linktext'])[6]").click()
    // - Click Merge button --//a[@class='buttonDangerous']
    page.locator("//a[@class='buttonDangerous']").click()
    // - Get the message, type of the alert and Accept the alert 
    page.on('dialog', alertType => {
        console.log(alertType.type())
        console.log(alertType.message())
        alertType.accept()
    })
    // - Assert the title of the page  -- view lead | Opentaps CRM
    await expect(page).toHaveTitle(/View Lead | opentaps CRM/)

})
