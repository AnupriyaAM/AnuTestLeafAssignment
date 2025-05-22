
import test, { expect } from "@playwright/test";

test("To validate upload in Accounts", async ({ page }) => {
    await page.goto("https://login.salesforce.com/");
    // - Enter username 
    await page.getByLabel('Username').fill("vidyar@testleaf.com")
    // - Enter password
    await page.getByLabel('Password').fill("Sales@123")
    //  - Click Login 
    await page.locator("//input[@id='Login']").click()
    // - Click App Launcher icon
    await page.locator("//div[@class='slds-r5']").click()
    //  - Click View All 
    await page.getByText('View All').click()
    // - Enter Accounts in App Launcher search box 
    await page.getByPlaceholder('Search apps or items...').fill('Accounts')
    // - Click Accounts ///////
    await page.locator("//p//mark[text()='Accounts']").click()
    // - Click New 
    await page.getByRole('button', { name: 'New' }).click()
    // - Enter Account Name 
    await page.locator("[name='Name']").fill('Lloyds')
    // - Select Warm from the Rating dropdown 
    await page.locator("(//span[text()='--None--'])[1]").click()
    await page.locator("//span[@title='Warm']").click()
    // - Select Prospect from the Type dropdown 
    await page.locator("(//span[text()='--None--'])[2]").click()
    await page.locator("//span[@title='Prospect']").click()
    // - Select Banking from the Industry dropdown
    await page.locator("(//span[text()='--None--'])[4]").click()
    await page.locator("//span[@title='Banking']").click()
    // - Select Public from the Ownership dropdown 
    await page.locator("(//span[text()='--None--'])[3]").click()
    await page.locator("//span[@title='Public']").click()
    // - Click Save 
    await page.locator("//button[@name='SaveEdit']").click()
    // - Assert the Account created 
    await page.locator("//div[@class='slds-hyphenate']").textContent()
    await expect(page.locator("//div[@class='slds-hyphenate']")).toHaveText('Account "Lloyds" was created.')
    // - Upload files 
    await page.locator("//span[text()='Upload Files']/parent::label/preceding-sibling::input").setInputFiles("document/Details.txt")
    // - Click Done and assert the uploaded file
    await page.locator("//span[text()='Done']").click()
    await expect(page.locator(".toastMessage.slds-text-heading--small.forceActionsText")).toHaveText("1 file was uploaded.")    
    await page.locator("//button//span[text()='Close']").click()
    await expect(page.locator("//span[text()='Details']")).toHaveText("Details")
})
