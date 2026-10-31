import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About Us' },
  { path: '/mission', name: 'Mission' },
  { path: '/vision', name: 'Vision' },
  { path: '/quality-policy', name: 'Quality Policy' },
  { path: '/constitution-and-by-laws', name: 'Constitution and By-Laws' },
  { path: '/executive', name: 'Organization Executive' },
  { path: '/programs', name: 'Programs' },
  { path: '/news', name: 'News' },
  { path: '/learning-materials', name: 'Learning Materials' },
  { path: '/contact', name: 'Contact' },
  { path: '/this-page-does-not-exist', name: 'Not Found' },
]

for (const route of routes) {
  test(`${route.name} accessibility`, async ({ page }) => {
    await page.goto(`http://localhost:4173${route.path}`)
    // Wait for React to hydrate and page skeleton to disappear
    await page.waitForSelector('#root > div', { state: 'attached', timeout: 10000 })
    await page.waitForFunction(() => !document.querySelector('.page-skeleton'), { timeout: 10000 })

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
}

test('color contrast and focus visible', async ({ page }) => {
  await page.goto('http://localhost:4173/')
  await page.waitForSelector('#root > div', { state: 'attached', timeout: 10000 })
  await page.waitForFunction(() => !document.querySelector('.page-skeleton'), { timeout: 10000 })

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2aa', 'wcag21aa', 'best-practice'])
    .analyze()

  const contrastViolations = accessibilityScanResults.violations.filter(v => v.id === 'color-contrast')
  const focusViolations = accessibilityScanResults.violations.filter(v => v.id === 'focus-order' || v.id === 'focus-visible')

  expect(contrastViolations).toEqual([])
  expect(focusViolations).toEqual([])
})