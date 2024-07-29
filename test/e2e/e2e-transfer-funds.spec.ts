import { test, expect } from '@playwright/test'

test.describe('Transfer funds', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click('text=Sign in')

    await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
  })

  test('Transfer funds', async ({ page }) => {
    await page.click('#transfer_funds_tab')

    await page.selectOption('#tf_fromAccountId', '2')
    await page.selectOption('#tf_toAccountId', '3')
    await page.fill('#tf_amount', '100')
    await page.fill('#tf_description', 'Test')

    await page.click('#btn_submit')

    const header = await page.locator('h2.board-header')
    await expect(header).toHaveText('Transfer Money & Make Payments - Verify')

    await page.click('#btn_submit')
    const message = await page.locator('.alert-success')
    await expect(message).toHaveText(
      'You successfully submitted your transaction.',
    )
  })
})
