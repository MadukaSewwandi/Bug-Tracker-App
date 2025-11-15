import { test, expect } from '@playwright/test';

test.describe('🐞 Bug Tracker App – Full Test Suite', () => {

  // 🔐 Updated LOGIN function (no navigation waits)
  async function login(page) {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[placeholder="Email Address"]', 'dm2002sew@gmail.com');
    await page.fill('input[placeholder="Enter Password"]', 'maduka');

    await page.click('button.submit-btn, button:has-text("Login"), button:has-text("🔓 Login")');

    // WAIT FOR HOME PAGE ELEMENT — NOT NAVIGATION
    await expect(page.locator('a[href="/new"]')).toBeVisible();

    console.log("✅ Login successful");
  }

  // Helper → Create a NEW bug and return its TITLE
  async function createNewBug(page, title) {
    await page.click('a[href="/new"]');

    await page.fill('input[placeholder="Enter bug title"]', title);
    await page.fill('textarea[placeholder="Describe the bug"]', 'Temporary bug for testing.');

    await page.selectOption('select', 'open');

    await page.click('button.submit-btn:has-text("Submit Bug")');

    // Ensure bug appears on home page
    await expect(page.locator('body')).toContainText(title);

    return title;
  }

  // 1️⃣ LOGIN TEST
  test('Login successfully', async ({ page }) => {
    await login(page);
  });

  // 2️⃣ REPORT BUG TEST
  test('Report a new bug', async ({ page }) => {
    await login(page);

    await createNewBug(page, 'UI glitch on dashboard');

    console.log("✅ Bug reported successfully");
  });

  // 3️⃣ EDIT BUG TEST (creates its own bug first)
  test('Edit an existing bug', async ({ page }) => {
    await login(page);

    const originalTitle = 'Bug to edit ' + Date.now();
    const updatedTitle = 'Updated bug title ' + Date.now();

    // Each browser creates its own bug
    await createNewBug(page, originalTitle);

    // Click EDIT for that specific bug
    await page.click(`xpath=//h3[contains(text(),"${originalTitle}")]/following-sibling::div/button[contains(text(),"✏️")]`);

    // Update bug
    await page.fill('input[placeholder="Enter bug title"]', updatedTitle);
    await page.fill('textarea[placeholder="Describe the bug"]', 'Updated bug description.');

    await page.selectOption('select', 'resolved');

    await page.click('button.submit-btn:has-text("Update Bug")');

    // Verify update
    await expect(page.locator('body')).toContainText(updatedTitle);

    console.log("✅ Bug edited successfully");
  });

  // 4️⃣ DELETE BUG TEST (creates its own bug first)
  test('Delete a bug', async ({ page }) => {
    await login(page);

    const deleteTitle = 'Bug to delete ' + Date.now();

    // Each browser creates its own bug
    await createNewBug(page, deleteTitle);

    // Confirm popup
    page.once('dialog', (dialog) => dialog.accept());

    // Click delete button for that specific bug
    await page.click(`xpath=//h3[contains(text(),"${deleteTitle}")]/following-sibling::div/button[contains(text(),"🗑")]`);

    await page.waitForTimeout(1500);

    // Verify bug is deleted
    await expect(page.locator('body')).not.toContainText(deleteTitle);

    console.log("✅ Bug deleted successfully");
  });

});
