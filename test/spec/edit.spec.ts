import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Edit } from '../pom';

const ELEMENT_ID = 'test-quill-html-edit';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Initial render', () => {
  test('Shows placeholder when empty and unfocused', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.placeholder).toHaveText('Enter your text...');
  });

  test('Top toolbar is hidden when not focused', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.topToolbar).not.toBeVisible();
  });

  test('Mounts editor and toolbar on focus', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await expect(edit.qlEditor).toBeVisible();
    await expect(edit.topToolbar).toBeVisible();
    await expect(edit.boldBtn).toBeVisible();
  });
});

test.describe('Renders pre-seeded content', () => {
  test('Renders formatted HTML in preview', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p><strong>Hello</strong> <em>world</em></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await expect(edit.qlEditor.locator('strong')).toHaveText('Hello');
    await expect(edit.qlEditor.locator('em')).toHaveText('world');
  });
});

test.describe('Toolbar config', () => {
  test('All expected toolbar buttons are rendered', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    for (const btn of edit.allToolbarButtons) await expect(btn).toBeVisible();
  });
});

test.describe('Typing', () => {
  test('Types text into the editor', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Some content');
    await expect(edit.qlEditor).toContainText('Some content');
  });
});

test.describe('Toolbar actions', () => {
  test.beforeEach(async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.typeIntoEditor('Sample text');
    await edit.selectAll();
  });

  test('Bold wraps selection in strong', async ({ page }) => {
    const edit = new Edit(page);
    await edit.boldBtn.click();
    await expect(edit.qlEditor.locator('strong')).toContainText('Sample text');
  });

  test('Undo reverts the last change', async ({ page }) => {
    const edit = new Edit(page);
    await edit.boldBtn.click();
    await expect(edit.qlEditor.locator('strong')).toBeVisible();
    await edit.undoBtn.click();
    await expect(edit.qlEditor.locator('strong')).toHaveCount(0);
  });
});

test.afterAll(async () => {
  await elementClient.reset(ELEMENT_ID);
});
