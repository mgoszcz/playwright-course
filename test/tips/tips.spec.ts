import { test, expect } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe('Tips & Tricks Section', () => {
  test('TestInfo object', async ({ page }, testInfo) => {
    await page.goto('https://www.example.com')
    // console.log(testInfo)
    console.log(testInfo.title)
    let newNumber = getRandomNumber()
    console.log(newNumber)
    let newString = getRandomString()
    console.log(newString)
  })

  test('Test Skip Browser', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Skip test in Chromium')
    await page.goto('https://www.example.com')
  })

  test('Test Fixme Annotation', async ({ page, browserName }) => {
    test.fixme(browserName === 'chromium', 'Test is not stable')
    await page.goto('https://www.example.com')
  })

  //npx playwright test --config=playwright.config.ts --project=Chromium --retries=3
  test.skip('Retry', async ({ page, browserName }) => {
    await page.goto('https//www.example.com')
  })

  // Parametrized tests
  const people = ['Mike', 'Judy', 'Peter', 'Alice', 'Bob']
  for (const name of people) {
    test(`Running test for ${name}`, async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com')
      await page.fill('#searchTerm', name)
      await page.waitForTimeout(3000)
    })
  }

  test('Mouse movement Simulation', async ({ page }) => {
    await page.goto('https://www.example.com')
    await page.mouse.move(0, 0)
    await page.mouse.down()
    await page.mouse.move(0, 100)
    await page.mouse.up()
  })

  test('Multiple Browser Tabs inside 1 Browser', async ({ browser }) => {
    const context = await browser.newContext()
    const page1 = await context.newPage()
    const page2 = await context.newPage()
    const page3 = await context.newPage()
    await page1.goto('https://www.example.com')
    await page1.waitForTimeout(2000)
    await page2.goto('http://zero.webappsecurity.com')
    await page2.waitForTimeout(2000)
    await page3.goto('https://google.com')
    await page3.waitForTimeout(2000)
  })

  // Device emulation
  // npx playwright open --device="iPhone 11" wikipedia.org

  // Convert web page to pdf
  // npx playwright pdf https://www.example.com my-file.pdf

  // Create screenshot of web page on specific device and wait for 3s before taking screenshot
  // npx playwright screenshot --device="iPhone 14" --color-scheme=dark --wait-for-timeout=3000 twitter.com twitter-iphone-image.png

  // Open browser in specific timezone and language
  // npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com
})
