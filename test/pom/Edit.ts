import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Edit extends pom.EditPanel {
  readonly qlEditor: Locator;
  readonly placeholder: Locator;
  readonly boldBtn: Locator;
  readonly italicBtn: Locator;
  readonly underlineBtn: Locator;
  readonly strikeBtn: Locator;
  readonly undoBtn: Locator;
  readonly redoBtn: Locator;
  readonly subscriptBtn: Locator;
  readonly superscriptBtn: Locator;
  readonly heading1Btn: Locator;
  readonly heading2Btn: Locator;
  readonly blockquoteBtn: Locator;
  readonly codeBlockBtn: Locator;
  readonly orderedListBtn: Locator;
  readonly bulletListBtn: Locator;
  readonly increaseIndentBtn: Locator;
  readonly decreaseIndentBtn: Locator;
  readonly linkBtn: Locator;
  readonly imageBtn: Locator;
  readonly clearBtn: Locator;
  readonly directionBtn: Locator;
  readonly fontSelect: Locator;
  readonly headerSelect: Locator;
  readonly colorSelect: Locator;
  readonly backgroundSelect: Locator;
  readonly alignSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.qlEditor = this.editor.locator('.ql-editor');
    this.placeholder = this.editor.locator('.ql-editor.placeholder');
    const tb = this.topToolbar;
    this.boldBtn = tb.getByRole('button', { name: 'Bold' });
    this.italicBtn = tb.getByRole('button', { name: 'Italic' });
    this.underlineBtn = tb.getByRole('button', { name: 'Underline' });
    this.strikeBtn = tb.getByRole('button', { name: 'Strikethrough' });
    this.undoBtn = tb.getByRole('button', { name: 'Undo' });
    this.redoBtn = tb.getByRole('button', { name: 'Redo' });
    this.subscriptBtn = tb.getByRole('button', { name: 'Subscript' });
    this.superscriptBtn = tb.getByRole('button', { name: 'Superscript' });
    this.heading1Btn = tb.getByRole('button', { name: 'Heading 1' });
    this.heading2Btn = tb.getByRole('button', { name: 'Heading 2' });
    this.blockquoteBtn = tb.getByRole('button', { name: 'Quote' });
    this.codeBlockBtn = tb.getByRole('button', { name: 'Code' });
    this.orderedListBtn = tb.getByRole('button', { name: 'Numbered list' });
    this.bulletListBtn = tb.getByRole('button', { name: 'Bulleted List' });
    this.increaseIndentBtn = tb.getByRole('button', {
      name: 'Increase indent',
    });
    this.decreaseIndentBtn = tb.getByRole('button', {
      name: 'Decrease indent',
    });
    this.linkBtn = tb.getByRole('button', { name: 'Insert link...' });
    this.imageBtn = tb.getByRole('button', { name: 'Image' });
    this.clearBtn = tb.getByRole('button', { name: 'Clear formatting' });
    this.directionBtn = tb.getByRole('button', { name: 'Text direction' });
    this.fontSelect = tb.getByRole('combobox', { name: 'Font' });
    this.headerSelect = tb.getByRole('combobox', { name: 'Style' });
    this.colorSelect = tb.getByRole('combobox', { name: 'Text color' });
    this.backgroundSelect = tb.getByRole('combobox', {
      name: 'Highlight color',
    });
    this.alignSelect = tb.getByRole('combobox', { name: 'Alignment' });
  }

  get allToolbarButtons(): Locator[] {
    return [
      this.undoBtn,
      this.redoBtn,
      this.boldBtn,
      this.italicBtn,
      this.underlineBtn,
      this.strikeBtn,
      this.subscriptBtn,
      this.superscriptBtn,
      this.heading1Btn,
      this.heading2Btn,
      this.blockquoteBtn,
      this.codeBlockBtn,
      this.orderedListBtn,
      this.bulletListBtn,
      this.increaseIndentBtn,
      this.decreaseIndentBtn,
      this.linkBtn,
      this.imageBtn,
      this.clearBtn,
      this.directionBtn,
    ];
  }

  async typeIntoEditor(text: string) {
    await this.qlEditor.click();
    await this.qlEditor.pressSequentially(text);
  }

  async selectAll() {
    await this.qlEditor.focus();
    await this.qlEditor.press('ControlOrMeta+a');
  }
}
