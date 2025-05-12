import { chromium, expect, test } from "@playwright/test";

test("To Create Lead", async ({page}) => {

    await page.goto("https://login.salesforce.com");
    await page.locator("//input[@id='username']").fill("vidyar@testleaf.com")
    await page.locator("//input[@type='password']").fill("Sales@123")
    await page.locator("//input[@id='Login']").click()
    //toggle menu button click 
    await page.locator("//div[@class='slds-r5']").click()
    //View All Click
    await page.locator("//button[text()='View All']").click()
    //Sales Click
    await page.locator("//span//p[text()='Sales']").click()
    //Leads Tab click
    await page.locator("//a//span[text()='Leads']").click()
    //New Button click
    await page.locator("//div[@title='New']").click()
    //dropdown
    await page.locator("(//span[text()='--None--'])[1]").click()
    await page.locator("//span[@title='Mrs.']").click()
    await page.locator("//input[@name='lastName']").fill("Amudhavalli Mohanraj")
    await page.locator("//input[@name='Company']").fill("BT Group")
    await page.locator("(//button[text()='Save'])[2]").click()
    //Save validation
    console.log(await page.locator("//slot[@name='primaryField']").textContent())
    await expect(page.locator("//slot[@name='primaryField']")).toHaveText('Mrs.  Amudhavalli Mohanraj')
})

test("To Edit Lead", async ({page}) => {

    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.locator("//input[@id='username']").fill("DemoSalesManager")
    await page.locator("//input[@type='password']").fill("crmsfa")
    await page.locator("//input[@value='Login']").click()
    //Click CRM/SFA link
    await page.locator("//div[@id='button']").click()
    //Click Leads link
    await page.locator("//div//a[text()='Leads']").click()
    //Click Create Lead
    await page.locator("//div//ul//li//a[text()='Create Lead']").click()
    //Enter value
    await page.locator("(//input[@name='companyName'])[2]").fill("BT")
    await page.locator("//input[@id='createLeadForm_firstName']").fill("Anupriya")
    await page.locator("//input[@id='createLeadForm_lastName']").fill("Amudhavalli Mohanraj")
    //Click create lead button
    await page.locator("//input[@name='submitButton']").click()
    //Click Edit
    await page.locator("//div//a[text()='Edit']").click()
    //Change company name
    await page.locator("//input[@id='updateLeadForm_companyName']").fill("BT Group")
    //Click update
    await page.locator("//input[@value='Update']").click()
})

test("To Create Individuals", async ({page}) => {

    await page.goto("https://login.salesforce.com");
    await page.locator("//input[@id='username']").fill("vidyar@testleaf.com")
    await page.locator("//input[@type='password']").fill("Sales@123")
    await page.locator("//input[@id='Login']").click()
    //toggle menu button click 
    await page.locator("//div[@class='slds-r5']").click()
    //View All Click
    await page.locator("//button[text()='View All']").click()
    //Click Individuals
    await page.locator("//span//p[text()='Individuals']").click()
    // //Dropdown icon in the Individuals tab slds-truncate (//span[text()='Individuals'])[1]  //span[text()='Recently Viewed | Individuals']
    // await page.locator("(//span[text()='Individuals'])[1]").click()
    //Click New Individual
    await page.locator("//a[@title='New']").click() 
    //Enter the Last Name
    await page.locator("//input[@placeholder='Last Name']").fill("Amudhavalli Mohanraj")
    //Save validation and verify individual name
    await page.locator("(//button//span[text()='Save'])[2]").click()
    console.log(await page.locator("//div//span[@class='uiOutputText']").textContent())
    await expect(page.locator("//div//span[@class='uiOutputText']")).toHaveText('Amudhavalli Mohanraj')
})

test("To Edit Individuals", async ({page}) => {

    await page.goto("https://login.salesforce.com");
    await page.locator("//input[@id='username']").fill("vidyar@testleaf.com")
    await page.locator("//input[@type='password']").fill("Sales@123")
    await page.locator("//input[@id='Login']").click()
    //toggle menu button click 
    await page.locator("//div[@class='slds-r5']").click()
    //View All Click
    await page.locator("//button[text()='View All']").click()
    //Click Individuals
    await page.locator("//span//p[text()='Individuals']").click()
    //search for individual last name Individual-search-input
    await page.locator("//input[@name='Individual-search-input']").fill("Amudhavalli Mohanraj")
    //click Dropdown icon and select edit //a//span//span[text()='Show more actions'] //a//span//span[@class='slds-assistive-text']
    await page.locator("(//a//span//span[@class='slds-assistive-text'])[3]").click()
    await page.locator("//a[@title='Edit']").click()
    //select salutation value
    await page.locator("(//div//a[text()='--None--'])[1]").click()
    await page.locator("//a[text()='Mrs.']").click()
    await page.locator("//input[@placeholder='First Name']").fill("Anupriya")
    //Save validation and verify individual name
    await page.locator("(//button//span[text()='Save'])[2]").click()
    console.log(await page.locator("//a[@title='Anupriya Amudhavalli Mohanraj']").textContent())
    await expect(page.locator("//a[@title='Anupriya Amudhavalli Mohanraj']")).toHaveText('Anupriya Amudhavalli Mohanraj')
    
})
