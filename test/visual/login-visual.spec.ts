import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Login Page Visual Tests', () => {
  let homepage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page)
    loginPage = new LoginPage(page)
    await homepage.open()
    await homepage.clickSignInButton()
  })

  test('Login Page Snapshot', async ({ page }) => {
    await loginPage.snapshotLoginForm()
  })

  test('Login Error message', async ({ page }) => {
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.snapshotErrorMessage()
  })
})
