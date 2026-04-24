import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Display } from '../pom';

const ELEMENT_ID = 'test-quill-html-display';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await elementClient.resetState(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Empty state', () => {
  test('Renders placeholder when content is empty', async ({ page }) => {
    const display = new Display(page);
    await expect(display.placeholder).toBeVisible();
    await expect(display.root).not.toBeVisible();
  });
});

test.describe('Content rendering', () => {
  test('Renders bold and italic marks', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p><strong>bold</strong> and <em>italic</em></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('strong')).toHaveText('bold');
    await expect(display.content.locator('em')).toHaveText('italic');
  });

  test('Renders underline and strikethrough marks', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p><u>under</u> and <s>strike</s></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('u')).toHaveText('under');
    await expect(display.content.locator('s')).toHaveText('strike');
  });

  test('Renders superscript and subscript', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p>x<sup>2</sup> and H<sub>2</sub>O</p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('sup')).toHaveText('2');
    await expect(display.content.locator('sub')).toHaveText('2');
  });

  test('Renders headings', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<h1>Main</h1><h2>Sub</h2>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('h1')).toHaveText('Main');
    await expect(display.content.locator('h2')).toHaveText('Sub');
  });

  test('Renders ordered and unordered lists', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<ul><li>a</li><li>b</li></ul><ol><li>1</li><li>2</li></ol>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('ul > li')).toHaveCount(2);
    await expect(display.content.locator('ol > li')).toHaveCount(2);
  });

  test('Renders blockquote', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<blockquote><p>wise words</p></blockquote>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('blockquote')).toContainText(
      'wise words',
    );
  });

  test('Renders links with href', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p><a href="https://tailor-cms.com">Tailor</a></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    const link = display.content.locator('a');
    await expect(link).toHaveText('Tailor');
    await expect(link).toHaveAttribute('href', 'https://tailor-cms.com');
  });

  test('Renders code blocks', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<pre><code>const x = 1;</code></pre>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('pre > code')).toHaveText(
      'const x = 1;',
    );
  });

  test('Preserves text alignment inline style', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content:
        '<p style="text-align: center">centered</p>' +
        '<p style="text-align: right">right</p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(
      display.content.locator('p', { hasText: 'centered' }),
    ).toHaveCSS('text-align', 'center');
    await expect(display.content.locator('p', { hasText: 'right' })).toHaveCSS(
      'text-align',
      'right',
    );
  });

  test('Preserves text color inline style', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p><span style="color: #F44E3B">red</span></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('span')).toHaveCSS(
      'color',
      'rgb(244, 78, 59)',
    );
  });

  test('Preserves background color inline style', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      content: '<p><span style="background-color: #FCDC00">hi</span></p>',
    });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.content.locator('span')).toHaveCSS(
      'background-color',
      'rgb(252, 220, 0)',
    );
  });
});
