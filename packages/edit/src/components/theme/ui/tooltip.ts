import Quill from 'quill';
import Tooltip from 'quill/ui/tooltip';

export default class ExtendedTooltip extends Tooltip {
  isOpen;

  constructor(quill: Quill, bounds: HTMLElement) {
    super(quill, bounds);
    this._onClick = this._onClick.bind(this);
    this.isOpen = false;
  }

  show() {
    super.show();
    this.isOpen = true;
    setTimeout(
      () =>
        document.body.addEventListener('mousedown', (e) => this._onClick(e)),
      0,
    );
    const bounds = this.quill.getBounds(this.quill.selection.savedRange);
    if (bounds) this.position(bounds);
  }

  hide() {
    super.hide();
    this.isOpen = false;
    document.body.removeEventListener('mousedown', (e) => this._onClick(e));
  }

  _onClick(e: Event) {
    if (this.isOpen && e.target && !this.root.contains(e.target as Node))
      this.hide();
  }
}
