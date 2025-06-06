import IconPicker from 'quill/ui/icon-picker';
import Picker from 'quill/ui/picker';
import Quill from 'quill';
import SnowTheme from 'quill/themes/snow';
import tippy from 'tippy.js';
import Toolbar from 'quill/modules/toolbar';

import mdiIcons, { getMdiIcon } from './toolbar-icons.ts';
import ColorPicker from './ui/color-picker.ts';
import ImageEmbed from './modules/image-embed.ts';

const colors = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466',
];
const reQuillControl = /^ql-/;

const createTooltip = (input: Picker | HTMLButtonElement, showDelay = 350) => {
  const isPicker = input instanceof Picker;
  const reference = isPicker ? input.container : input;
  const title = isPicker ? input.select.dataset.title : input.dataset.title;

  tippy(reference, {
    content: title || '',
    appendTo: 'parent',
    placement: 'bottom',
    delay: [showDelay, 0],
    trigger: 'click focus',
    onShow: () => {
      if (reference.classList.contains('ql-expanded')) return false;
    },
  });
};

export default () => {
  Quill.register(`modules/${ImageEmbed.NAME}`, ImageEmbed, true);

  const { toolbar } = SnowTheme.DEFAULTS.modules;

  return class TailorTheme extends SnowTheme {
    static NAME = 'tailor';
    static DEFAULTS = {
      modules: {
        toolbar,
        [ImageEmbed.NAME]: true,
      },
    };

    declare public options: any;
    declare public quill: any;

    extendToolbar(toolbar: Toolbar) {
      super.extendToolbar(toolbar);
      this.pickers.forEach((picker) => createTooltip(picker));
    }

    buildButtons(buttons: NodeListOf<HTMLButtonElement>) {
      buttons.forEach((it) => {
        buildButton(it);
        createTooltip(it);
      });
    }

    buildPickers(
      selects: NodeListOf<HTMLSelectElement>,
      icons: Record<string, string | Record<string, string>>,
    ) {
      const filteredSelects = Array.from(selects);
      const background = remove(filteredSelects, (it: HTMLSelectElement) =>
        it.classList.contains('ql-background'),
      );
      const color = remove(filteredSelects, (it: HTMLSelectElement) =>
        it.classList.contains('ql-color'),
      );
      const align = remove(filteredSelects, (it: HTMLSelectElement) =>
        it.classList.contains('ql-align'),
      );
      super.buildPickers(filteredSelects as any, icons);
      if (background) {
        fillSelect(background, colors, '#ffffff');
        this.pickers.push(
          new ColorPicker(this.quill, {
            type: 'background',
            select: background,
            label: getMdiIcon('background'),
          }),
        );
      }
      if (color) {
        fillSelect(color, colors, '#000000');
        this.pickers.push(
          new ColorPicker(this.quill, {
            type: 'color',
            select: color,
            label: getMdiIcon('color'),
          }),
        );
      }
      if (align) {
        const icons = mapKeys(mdiIcons.align, (_key: string, icon: string) =>
          getMdiIcon('align', icon),
        );
        this.pickers.push(new IconPicker(align, icons));
      }
    }
  };
};

function buildButton(button: HTMLButtonElement) {
  let name = Array.from(button.classList).find((it: string) =>
    reQuillControl.test(it),
  ) as string;
  if (!name) return;
  name = name.replace(reQuillControl, '');
  if (name === 'direction') {
    button.innerHTML = getMdiIcon(name, '') + getMdiIcon(name, 'rtl');
    return;
  }
  button.innerHTML = getMdiIcon(name, button.value);
}

function fillSelect(
  select: HTMLSelectElement,
  values: string[],
  defaultValue = '',
) {
  values.forEach((value) => {
    const option = document.createElement('option');
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected');
    } else {
      option.setAttribute('value', value);
    }
    select.appendChild(option);
  });
}

function mapKeys(obj: any, cb: any) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    value = cb(value, key);
    return Object.assign(acc, { [key]: value });
  }, {});
}

function remove<T>(arr: T[], cb: (it: T) => boolean) {
  const index = arr.findIndex(cb);
  return arr.splice(index, 1)[0];
}
