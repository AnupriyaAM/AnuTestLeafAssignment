import { chromium, expect, test } from "@playwright/test";

let companyName: string | null;
let toastValue: string | null;

test("To Create Lead", async ({page}) => {
    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.getByLabel("Username").fill("DemoSalesManager")
    await page.locator("//input[@type='password']").fill("crmsfa")
    await page.locator("//input[@class='decorativeSubmit']").click()
    //Click CRM/SFA link
    await page.locator("//div[@id='button']").click()
    //Click Leads link
    await page.locator("//div//a[text()='Leads']").click()
    //Click Create Lead
    await page.locator("//div//ul//li//a[text()='Create Lead']").click()
    // Fill the Company Name,First Name,Last Name,Salutation,Title,Annual Revenue,Department,Phone number
    await page.locator("(//input[@name='companyName'])[2]").fill("BT")
    await page.locator("//input[@id='createLeadForm_firstName']").fill("Anu")
    await page.locator("#createLeadForm_lastName").fill("Mohan")
    await page.locator("//input[@name='personalTitle']").fill("Mrs")
    await page.locator("#createLeadForm_generalProfTitle").fill("Senior QA")
    await page.locator("//input[@name='annualRevenue']").fill("55000")
    await page.locator("#createLeadForm_departmentName").fill("Retail")
    await page.locator("#createLeadForm_primaryPhoneNumber").fill("447586238557")
    // Click Create Lead button
    await page.locator("//input[@name='submitButton']").click()
    //verify company name, first name, last name and the status
    companyName = await page.locator("#viewLead_companyName_sp").textContent()
    expect(companyName!.substring(0,2)).toBe('BT')
    expect(page.locator("#viewLead_firstName_sp")).toHaveText('Anu')
    expect(page.locator("#viewLead_lastName_sp")).toHaveText('Mohan')
    expect(page.locator("#viewLead_personalTitle_sp")).toHaveText('Mrs')
    expect(page.locator("#viewLead_generalProfTitle_sp")).toHaveText('Senior QA')
    expect(page.locator("#viewLead_annualRevenue_sp")).toHaveText('$55,000.00')
    expect(page.locator("#viewLead_departmentName_sp")).toHaveText('Retail')
    expect(page.locator("(//div[@class='tabletext'])[2]")).toHaveText('1 447586238557')
    //get page title
    await expect(page).toHaveTitle(/View Lead | opentaps CRM/)
})

test("To Edit Lead", async ({page}) => {
    await page.goto("http://leaftaps.com/opentaps/control/main");
    // page.getByRole('input',{name:'companyName'})
    await page.getByLabel("Username").fill("DemoSalesManager")
    await page.locator("//input[@type='password']").fill("crmsfa")
    await page.locator("//input[@class='decorativeSubmit']").click()
    //Click CRM/SFA link
    await page.locator("//div[@id='button']").click()
    //Click Leads link
    await page.locator("//div//a[text()='Leads']").click()
    //Click Find Lead
    await page.locator("//div//ul//li//a[text()='Find Leads']").click()
    // Fill the Company Name,First Name,Last Name,Salutation,Title,Annual Revenue,Department,Phone number
    await page.locator("(//input[@name='firstName'])[3]").fill("Anupriya")
    await page.locator("//button[text()='Find Leads']").click()
    await page.locator("(//td//div//a[@class='linktext'])[1]").click()
    await page.locator("//a[text()='Edit']").click()
    await page.locator("//input[@id='updateLeadForm_companyName']").fill("BT")
    await page.locator("//input[@id='updateLeadForm_annualRevenue']").fill("56000")
    await page.locator("#updateLeadForm_departmentName").fill("Tele Communication")
    await page.locator("#updateLeadForm_description").fill("British multinational telecommunications services company")
    //Click update
    await page.locator("//input[@value='Update']").click()
    //Validate updated fields
    companyName = await page.locator("#viewLead_companyName_sp").textContent()
    expect(companyName!.substring(0,2)).toBe('BT')
    expect(page.locator("#viewLead_annualRevenue_sp")).toHaveText('$56,000.00')
    expect(page.locator("#viewLead_departmentName_sp")).toHaveText('Tele Communication')
    expect(page.locator("#viewLead_description_sp")).toHaveText('British multinational telecommunications services company')
    //get page title
    await expect(page).toHaveTitle(/View Lead | opentaps CRM/)
    console.log(await page.title())
})

test("To Create a new Account", async ({page}) => {
    await page.goto("https://login.salesforce.com/");
    //getByLabel
    await page.getByLabel('Username').fill("vidyar@testleaf.com")
    await page.getByLabel('Password').fill("Sales@123")
    await page.locator("//input[@id='Login']").click()
    //title and url of the page using appropriate assertions
    // await expect(page).toHaveTitle(/Home | Salesforce/)
    await expect(page).toHaveTitle(/Lightning Experience/)
    console.log(await page.title())
    // await expect(page).toHaveURL(/Home | Salesforce/)
    console.log(page.url())
    //App Launcher using the class locator
    await page.locator("//div[@class='slds-r5']").click()
    // await page.locator(".slds-r5'").click()
    //View All using getByText
    await page.getByText('View All').click()
    // Enter ‘Service’ in the App Launcher Search box using getByPlaceHolder
    await page.getByPlaceholder('Search apps or items...').fill('Service')
    // Click Service using index based XPath 
    await page.locator("(//p//mark[text()='Service'])[1]").click()
    // Click Accounts using attribute based CSS selector
    // await page.locator("([class='slds-truncate'])[4]").click() 
    await page.locator("(//a//span[@class='slds-truncate'])[3]").click() 
    // Click New using getByRole 
    await page.getByRole('button',{name:'New'}).click()
    // Enter Account name using attribute based CSS selector 
    await page.locator("[name='Name']").fill('LBG')
    // Click Save button using XPath 
    await page.locator("//button[@name='SaveEdit']").click()
    // Verify the toast message displayed
    toastValue = await page.locator("//div[@class='slds-hyphenate']").textContent()
    console.log(toastValue)
    expect(toastValue).toBe('Account "LBG" was created.')
})
