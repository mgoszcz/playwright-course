import { expect, Locator, Page } from '@playwright/test'

export class FeedbackPage {
  readonly page: Page
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly subjectInput: Locator
  readonly commentInput: Locator
  readonly submitButton: Locator
  readonly resetButton: Locator
  readonly feedbackTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.nameInput = this.page.locator('#name')
    this.emailInput = this.page.locator('#email')
    this.subjectInput = this.page.locator('#subject')
    this.commentInput = this.page.locator('#comment')
    this.submitButton = this.page.locator("input[type='submit']")
    this.resetButton = this.page.locator("input[name='clear']")
    this.feedbackTitle = this.page.locator('#feedback-title')
  }

  async fillForm(
    name: string,
    email: string,
    subject: string,
    comment: string,
  ) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.subjectInput.fill(subject)
    await this.commentInput.fill(comment)
  }

  async resetForm() {
    await this.resetButton.click()
  }

  async submitForm() {
    await this.submitButton.click()
  }

  async assertAllInputsEmpty() {
    await expect(this.nameInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
    await expect(this.subjectInput).toBeEmpty()
    await expect(this.commentInput).toBeEmpty()
  }

  async assertFeedbackTitleVisible() {
    await expect(this.feedbackTitle).toBeVisible()
  }
}
