import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Login / Logout flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)
    await homePage.open()
    await homePage.clickSignInButton()
  })

  test('Negative scenario for login', async ({ page }) => {
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.wait(3000)

    const errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toHaveText('Login and/or password are wrong.')
  })

  test('Positive Scenario for login and logout', async ({ page }) => {
    await loginPage.login('username', 'password')
    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')

    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
