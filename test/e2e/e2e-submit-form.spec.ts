import { test } from '@playwright/test'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Feedback Form', () => {
  let homePage: HomePage
  let feedbackPage: FeedbackPage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    feedbackPage = new FeedbackPage(page)
    await homePage.open()
    await homePage.clickFeedbackLink()
  })

  // Reset feedback form
  test('Reset feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'some name',
      'some_email@email.com',
      'some subject',
      'some nice comment about the application',
    )
    await feedbackPage.resetForm()
    await feedbackPage.assertAllInputsEmpty()
  })

  // Submit feedback form
  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.fillForm(
      'some name',
      'some_email@email.com',
      'some subject',
      'some nice comment about the application',
    )
    await feedbackPage.submitForm()
    await feedbackPage.assertFeedbackTitleVisible()
  })
})
