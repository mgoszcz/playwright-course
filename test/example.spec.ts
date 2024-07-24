import { test, expect } from '@playwright/test'

import { loadHomePage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
  await page.goto('https://example.com/')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toHaveText('Example Domain')
})

test('Clicking on elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/')
  await page.click('#signin_button')
  await page.click('text=Sign in')
  const errorMessage = await page.locator('.alert-error')
  await expect(errorMessage).toHaveText('Login and/or password are wrong.')
})

test.skip('Selectors', async ({ page }) => {
  // text
  await page.click('text=some text')

  // Css selectors
  await page.click('button')
  await page.click('#id')
  await page.click('.class')

  // Only visible css selector
  await page.click('.submit-button:visible')

  // Combinations
  await page.click('#username .first')

  // XPath
  await page.click('//button')
})

test.describe('My first test suite', () => {
  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')

    await page.fill('#user_login', 'username')
    await page.fill('#user_password', 'userpassword')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toHaveText('Login and/or password are wrong.')
  })

  // Use tags to group tests and run them with: npx playwright test --grep @myTag
  // or run all except tagged with npx playwright test --grep-invert @myTag
  test('Assertions @myTag', async ({ page }) => {
    await page.goto('https://example.com/')
    await expect(page).toHaveURL('https://example.com/')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe.parallel('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com/')
  })

  test('Screenshot', async ({ page }) => {
    await page.screenshot({ path: 'example.png', fullPage: true })
  })

  test('Single element screenshot', async ({ page }) => {
    const element = await page.locator('h1')
    await element.screenshot({ path: 'single_element.png' })
  })
})

test('Custom helpers', async ({ page }) => {
  await loadHomePage(page)
  // await page.pause() // pause execution and enables inspector
  await assertTitle(page)
})
