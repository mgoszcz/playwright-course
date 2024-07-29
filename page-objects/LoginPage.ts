import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  // Define selectors
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator

  // Init selectors using constructor
  constructor(page: Page) {
    super(page)
    this.usernameInput = this.page.locator('#user_login')
    this.passwordInput = this.page.locator('#user_password')
    this.submitButton = this.page.locator('text=Sign in')
    this.errorMessage = this.page.locator('.alert-error')
  }

  async login(username: string, password: string) {
    await this.page.fill('#user_login', username)
    await this.page.fill('#user_password', password)
    await this.page.click('text=Sign in')
  }

  async getErrorMessage(): Promise<Locator> {
    return this.page.locator('.alert-error')
  }
}
