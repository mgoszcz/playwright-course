import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { NavBar } from '../../page-objects/components/NavBar'

test.describe.parallel('Make payment', () => {
  let loginPage: LoginPage
  let homePage: HomePage
  let paymentPage: PaymentPage
  let navBar: NavBar
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)
    navBar = new NavBar(page)
    await homePage.open()
    await homePage.clickSignInButton()
    await loginPage.login('username', 'password')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    await navBar.payBills.click()
  })

  test('Should send new payment', async ({ page }) => {
    await paymentPage.createPayment()
    await paymentPage.assertSuccessMessage()
  })

  test('Purchase foreign currency', async ({ page }) => {
    // const l = await page.locator('text=Purchase Foreign Currency')
    await page.getByText('Purchase Foreign Currency').click()

    await page.selectOption('#pc_currency', 'EUR')
    await expect(page.locator('#sp_sell_rate')).toContainText('1 euro (EUR)')
    await page.fill('#pc_amount', '100')
    await page.click('#pc_inDollars_true')
    await page.click('#pc_calculate_costs')
    await expect(page.locator('#pc_conversion_amount')).toContainText(
      '100.00 U.S. dollar (USD)',
    )

    await page.click('#purchase_cash')

    await expect(page.locator('#alert_content')).toHaveText(
      'Foreign currency cash was successfully purchased.',
    )
  })
})
