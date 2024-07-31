import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  // Define selectors
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly loginForm: Locator

  // Init selectors using constructor
  constructor(page: Page) {
    super(page)
    this.usernameInput = this.page.locator('#user_login')
    this.passwordInput = this.page.locator('#user_password')
    this.submitButton = this.page.locator('text=Sign in')
    this.errorMessage = this.page.locator('.alert-error')
    this.loginForm = this.page.locator('#login_form')
  }

  async login(username: string, password: string) {
    await this.page.fill('#user_login', username)
    await this.page.fill('#user_password', password)
    await this.page.click('text=Sign in')
  }

  async getErrorMessage(): Promise<Locator> {
    return this.page.locator('.alert-error')
  }

  async snapshotLoginForm() {
    await expect(await this.loginForm.screenshot()).toMatchSnapshot(
      'login-form.png',
    )
  }

  async snapshotErrorMessage() {
    await expect(await this.errorMessage.screenshot()).toMatchSnapshot(
      'error-message.png',
    )
  }
}
