import { Page } from '@playwright/test'

export abstract class AbstractPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async wait(time) {
    await this.page.waitForTimeout(time)
  }
}
