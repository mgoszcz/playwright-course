import { test, expect } from '@playwright/test'

// To update snapshots:
// npx playwright test --config=visual.config.ts --project=Chromium --update-snapshots

test.describe('Visual Regression Testing Example', () => {
  test('Full page snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    expect(await page.screenshot()).toMatchSnapshot('homepage.png')
  })

  test('Single element snapshot', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageHeader = await page.$('h1')
    expect(await pageHeader.screenshot()).toMatchSnapshot('header.png')
  })
})
