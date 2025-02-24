import './image-embed-tooltip.scss';
import Keyboard from 'quill/modules/keyboard';
import Quill from 'quill';

import Tooltip from './tooltip.ts';
export default class ImageEmbedTooltip extends Tooltip {
  static TEMPLATE = `
    <div class="controls">
      <label>Enter image url:</label>
      <input class="url" type="text">
      <a class="action">Save</a>
    </div>
  `;

  padding: string;
  textbox: HTMLInputElement | null;
  btnAction: HTMLAnchorElement | null;

  constructor(quill: any, bounds: any, { spacing = 0 } = {}) {
    super(quill, bounds);
    this.padding = ' '.repeat(spacing);
    this.textbox = this.root.querySelector('input.url');
    this.btnAction = this.root.querySelector('a.action');
    this.listen();
  }

  listen() {
    this.btnAction?.addEventListener('click', () => this.embedImage());
    this.textbox?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (Keyboard.match(e, { key: 'enter' })) {
        this.embedImage();
        e.preventDefault();
      } else if (Keyboard.match(e, { key: 'escape' })) {
        this.hide();
        e.preventDefault();
      }
    });
  }

  show() {
    super.show();
    this.root.classList.add('ql-image-embed');
    this.textbox?.select();
  }

  embedImage() {
    const url = this.textbox?.value;
    if (!url) return;
    const { quill } = this;
    const range = quill.getSelection(true);
    if (range) {
      const { padding } = this;
      const source = Quill.sources.USER;
      let offset = range.index + range.length;
      quill.insertText(offset, padding, source);
      offset += padding.length;
      quill.insertEmbed(offset, 'image', url, source);
      offset += 1;
      quill.insertText(offset, padding, source);
      offset += padding.length;
      quill.setSelection(offset, source);
    }
    if (this.textbox) this.textbox.value = '';
    this.hide();
  }
}
