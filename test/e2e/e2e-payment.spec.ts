import { test, expect } from '@playwright/test'

test.describe.parallel('Make payment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click('text=Sign in')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    await page.click('#pay_bills_tab')
  })

  test('Should send new payment', async ({ page }) => {
    await page.selectOption('#sp_payee', 'apple')
    await page.click('#sp_get_payee_details')
    const payeeDetails = await page.locator('#sp_payee_details')
    await expect(payeeDetails).toHaveText('For 48944145651315 Apple account')
    await page.selectOption('#sp_account', '6')
    await page.fill('#sp_amount', '5000')
    await page.fill('#sp_date', '2022-01-01')
    await page.fill('#sp_description', 'Test')
    await page.click('#pay_saved_payees')
    const message = await page.locator('#alert_content > span')
    await expect(message).toBeVisible()
    await expect(message).toHaveText('The payment was successfully submitted.')
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
