import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

const transactionsCount = [3, 3, 3, 2, 0, 0]

test.describe('Account activity', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    await homePage.open()
    await homePage.clickSignInButton()
    await loginPage.login('username', 'password')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Should display transactions', async ({ page }) => {
    await page.click('#account_activity_tab')
    for (let i = 0; i < transactionsCount.length; i++) {
      await page.selectOption('#aa_accountId', `${i + 1}`)
      const numberOfTRansactions = await page.locator(
        '#all_transactions_for_account > table > tbody > tr',
      )
      await expect(numberOfTRansactions).toHaveCount(transactionsCount[i])
    }
  })
})
