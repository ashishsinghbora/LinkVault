import { test, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

const VIEWPORTS = [
  { name: 'phone-320', width: 320, height: 700 },
  { name: 'phone-360', width: 360, height: 800 },
  { name: 'phone-390', width: 390, height: 844, isScreenshot: true },
  { name: 'phone-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024, isScreenshot: true },
  { name: 'tablet-1024', width: 1024, height: 768 },
  { name: 'laptop-1280', width: 1280, height: 800, isScreenshot: true },
  { name: 'laptop-1440', width: 1440, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080, isScreenshot: true },
  { name: 'desktop-2560', width: 2560, height: 1440 },
];

test.describe('Responsive Layout & No Horizontal Overflow', () => {
  for (const vp of VIEWPORTS) {
    test(`renders cleanly at ${vp.width}x${vp.height} (${vp.name})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      // Verify page title
      await expect(page).toHaveTitle(/Ashish Singh Bora/);

      // Verify hero is visible
      const hero = page.locator('#signal-hero');
      await expect(hero).toBeVisible();

      // Verify no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll).toBe(false);

      // Take screenshot for representative devices
      if (vp.isScreenshot) {
        const screenshotDir = path.resolve(process.cwd(), 'tests/e2e/screenshots');
        if (!fs.existsSync(screenshotDir)) {
          fs.mkdirSync(screenshotDir, { recursive: true });
        }
        await page.screenshot({
          path: path.join(screenshotDir, `${vp.name}.png`),
          fullPage: false,
        });
      }
    });
  }
});

test.describe('Interactive Features', () => {
  test('theme switcher toggles dark and light mode', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');

    // Default is dark
    await expect(html).toHaveClass(/dark/);

    // Click theme toggle button
    const themeBtn = page.locator('header button[aria-label*="theme"]');
    await themeBtn.click();

    // Switched to light
    await expect(html).toHaveClass(/light/);
  });

  test('search bar filters links dynamically', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.locator('#search-input');
    await expect(searchInput).toBeVisible();

    // Type a specific query
    await searchInput.fill('ETS');

    // ETS project should remain visible
    await expect(page.locator('text=ETS — Encrypted Tiered Storage').first()).toBeVisible();

    // Clear search
    await searchInput.fill('');
    await expect(page.locator('text=GitHub Repositories').first()).toBeVisible();
    await expect(page.locator('text=Techie Ashish').first()).toBeVisible();
    await expect(page.locator('text=Financial Education for Young Citizens').first()).toBeVisible();
    await expect(page.locator('text=Uttarakhand Technical University').first()).toBeVisible();
  });

  test('share modal opens with QR canvas and closes cleanly', async ({ page }) => {
    await page.goto('/');

    // Click Share Profile
    const shareBtn = page.locator('button:has-text("Share Profile")').first();
    await shareBtn.click();

    // Modal should be visible
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(page.locator('text=SHARE SIGNAL')).toBeVisible();

    // Close button
    const closeBtn = page.locator('button[aria-label="Close share dialog"]');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('local studio is accessible in development mode', async ({ page }) => {
    await page.goto('/studio.html');

    // Verify studio header and sidebar
    await expect(page.locator('aside').getByText('LINKVAULT')).toBeVisible();
    await expect(page.locator('aside').getByText('STUDIO')).toBeVisible();
    await expect(page.locator('text=Overview').first()).toBeVisible();
    await expect(page.locator('text=Identity & Bio').first()).toBeVisible();
  });
});
