import { test, expect } from '@playwright/test';

test.describe('Disease Detection Flow', () => {
    test('complete disease detection workflow', async ({ page }) => {
        await page.goto('/');

        // Check for hero section
        await expect(page.locator('h1')).toContainText('Protect Your Crops');

        // Navigate to dashboard (assuming direct link for test)
        await page.goto('/dashboard/scan');

        // Verify upload zone presence
        await expect(page.locator('text=Upload Image')).toBeVisible();

        // Mock image upload would go here if file exists in tests/fixtures
    });
});
