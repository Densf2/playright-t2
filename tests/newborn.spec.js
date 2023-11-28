import { test, expect } from '@playwright/test';
import { MainPageNewborn } from './pages/mainPageNewborn';

test.describe('Verification steps for newborn website', () => {
    
    test.beforeEach(async({ page }) => {
        await page.goto('/')
    })

    test('check the state after open page', async ({ page })=>{
        // await page.goto('/')
        await expect(page.locator('span.card-title').nth(0)).toBeVisible()
        await expect(page.locator('div.row span.card-title')).nth(0).toHaveText('Виручка:')
    })

    test.skip('usage POM', async ({ page }) => {
        const mainpagenewborn = new MainPageNewborn(page)
        mainpagenewborn.verifyLogoutVisible()
    })

    test('without POM', async({ page }) => {
        await expect(page.locator('ul > li.bold.last > a')).toHaveText('Вийти')
    })

})
