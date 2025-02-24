import './color-picker.scss';
import ColorPicker from 'quill/ui/color-picker';
import Quill from 'quill';

const className = (...names: string[]): string => names.join(' ');

interface ButtonOptions {
  icon: string;
  text: string;
}

interface ColorPickerOptions {
  type: string;
  select: HTMLSelectElement;
  label: string;
}

export default class ExtendedColorPicker extends ColorPicker {
  quill: Quill;
  type: string;
  options: any;

  constructor(quill: Quill, options: ColorPickerOptions) {
    super(options.select, options.label);
    this.quill = quill;
    this.type = options.type;
  }

  buildPicker() {
    super.buildPicker();
    const btnReset = createButton({ icon: 'mdi-water-off', text: 'None' });
    btnReset.className = className('picker-item__none');
    btnReset.addEventListener('click', () => {
      this.quill.format(this.type, null, Quill.sources.USER);
      this.close();
    });
    const colorOptions = wrapOptions(this.options);
    colorOptions.className = className('picker-colors');
    this.options.appendChild(btnReset);
    this.options.appendChild(colorOptions);
  }
}

function wrapOptions({ children }: HTMLElement) {
  const container = document.createElement('div');
  Array.from(children).forEach((option) => container.appendChild(option));
  return container;
}

function createButton({ icon, text }: ButtonOptions): HTMLElement {
  const btn = document.createElement('span');
  btn.tabIndex = 0;
  btn.setAttribute('role', 'button');
  btn.appendChild(createIcon(icon));
  btn.innerHTML += text;
  return btn;
}

function createIcon(name: string): HTMLElement {
  const icon = document.createElement('span');
  icon.className = className('icon', 'mdi', name);
  return icon;
}
