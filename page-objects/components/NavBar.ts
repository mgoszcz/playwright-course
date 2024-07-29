import { Locator, Page } from '@playwright/test'

export class NavBar {
  readonly page: Page
  readonly accountSummary: Locator
  readonly accountActivity: Locator
  readonly transferFunds: Locator
  readonly payBills: Locator
  readonly myMoneyMap: Locator
  readonly onlineStatements: Locator

  constructor(page: Page) {
    this.page = page
    this.accountSummary = this.page.locator('#account_summary_tab')
    this.accountActivity = this.page.locator('#account_activity_tab')
    this.transferFunds = this.page.locator('#transfer_funds_tab')
    this.payBills = this.page.locator('#pay_bills_tab')
    this.myMoneyMap = this.page.locator('#money_map_tab')
    this.onlineStatements = this.page.locator('#online_statements_tab')
  }
}
