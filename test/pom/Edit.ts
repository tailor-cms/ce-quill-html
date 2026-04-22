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
    this.boldBtn = tb.locator('button.ql-bold');
    this.italicBtn = tb.locator('button.ql-italic');
    this.underlineBtn = tb.locator('button.ql-underline');
    this.strikeBtn = tb.locator('button.ql-strike');
    this.undoBtn = tb.locator('button.ql-undo');
    this.redoBtn = tb.locator('button.ql-redo');
    this.subscriptBtn = tb.locator('button.ql-script[value="sub"]');
    this.superscriptBtn = tb.locator('button.ql-script[value="super"]');
    this.heading1Btn = tb.locator('button.ql-header[value="1"]');
    this.heading2Btn = tb.locator('button.ql-header[value="2"]');
    this.blockquoteBtn = tb.locator('button.ql-blockquote');
    this.codeBlockBtn = tb.locator('button.ql-code-block');
    this.orderedListBtn = tb.locator('button.ql-list[value="ordered"]');
    this.bulletListBtn = tb.locator('button.ql-list[value="bullet"]');
    this.increaseIndentBtn = tb.locator('button.ql-indent[value="+1"]');
    this.decreaseIndentBtn = tb.locator('button.ql-indent[value="-1"]');
    this.linkBtn = tb.locator('button.ql-link');
    this.imageBtn = tb.locator('button.ql-image');
    this.clearBtn = tb.locator('button.ql-clean');
    this.directionBtn = tb.locator('button.ql-direction[value="rtl"]');
    this.fontSelect = tb.locator('select.ql-font');
    this.headerSelect = tb.locator('select.ql-header');
    this.colorSelect = tb.locator('select.ql-color');
    this.backgroundSelect = tb.locator('select.ql-background');
    this.alignSelect = tb.locator('select.ql-align');
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
