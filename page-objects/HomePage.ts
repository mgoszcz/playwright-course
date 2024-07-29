import { Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly signInButton: Locator
  readonly searchInput: Locator
  readonly linkFeedback: Locator

  constructor(page: Page) {
    this.page = page
    this.signInButton = this.page.locator('#signin_button')
    this.searchInput = this.page.locator('#searchTerm')
    this.linkFeedback = this.page.locator('#feedback')
  }

  async open() {
    await this.page.goto('http://zero.webappsecurity.com/')
  }

  async clickSignInButton() {
    await this.signInButton.click()
  }

  async clickFeedbackLink() {
    await this.linkFeedback.click()
  }

  async searchFor(searchTerm: string) {
    await this.searchInput.fill(searchTerm)
    await this.searchInput.press('Enter')
  }
}
