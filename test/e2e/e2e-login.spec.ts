import { test, expect } from '@playwright/test'

test.describe.parallel('Login / Logout flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
  })

  test('Negative scenario for login', async ({ page }) => {
    await page.fill('#user-name', 'invalid username')
    await page.fill('#password', 'invalid password')
    await page.click('text=Login')
    const errorMessage = await page.locator('data-test=error')
    await expect(errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    )
  })

  test('Positive Scenario for login and logout', async ({ page }) => {
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('text=Login')

    const accountSummaryTab = await page.locator('.title')
    await expect(accountSummaryTab).toBeVisible()

    await page.click('#react-burger-menu-btn')
    await page.click('text=Logout')
    await expect(page).toHaveURL('https://www.saucedemo.com/')
  })
})
