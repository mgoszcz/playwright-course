import { test, expect } from '@playwright/test'

const transactionsCount = [3, 3, 3, 2, 0, 0]

test.describe('Account activity', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'password')
    await page.click('text=Sign in')

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
