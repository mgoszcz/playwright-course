import { expect, Locator, Page } from '@playwright/test'

export class PaymentPage {
  readonly page: Page
  readonly payeeSelect: Locator
  readonly payeeDetailsButton: Locator
  readonly payeeDetails: Locator
  readonly accountSelect: Locator
  readonly amountInput: Locator
  readonly dateInput: Locator
  readonly descriptionInput: Locator
  readonly submitButton: Locator
  readonly message: Locator

  constructor(page: Page) {
    this.page = page
    this.payeeSelect = this.page.locator('#sp_payee')
    this.payeeDetailsButton = this.page.locator('#sp_get_payee_details')
    this.payeeDetails = this.page.locator('#sp_payee_details')
    this.accountSelect = this.page.locator('#sp_account')
    this.amountInput = this.page.locator('#sp_amount')
    this.dateInput = this.page.locator('#sp_date')
    this.descriptionInput = this.page.locator('#sp_description')
    this.submitButton = this.page.locator('#pay_saved_payees')
    this.message = this.page.locator('#alert_content > span')
  }

  async createPayment() {
    await this.payeeSelect.selectOption('Apple')
    await this.payeeDetailsButton.click()
    await expect(this.payeeDetails).toBeVisible()
    await this.accountSelect.selectOption('6')
    await this.amountInput.fill('5000')
    await this.dateInput.fill('2022-01-01')
    await this.descriptionInput.fill('Test')
    await this.submitButton.click()
  }

  async assertSuccessMessage() {
    await expect(this.message).toBeVisible()
    await expect(this.message).toHaveText(
      'The payment was successfully submitted.',
    )
  }
}
