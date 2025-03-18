const isString = (arg: any) => typeof arg === 'string';

const mdiIcons: Record<string, string | Record<string, string>> = {
  undo: 'undo',
  redo: 'redo',
  align: {
    '': 'format-align-left',
    center: 'format-align-center',
    right: 'format-align-right',
    justify: 'format-align-justify',
  },
  background: 'format-color-highlight',
  blockquote: 'format-quote-close',
  bold: 'format-bold',
  clean: 'format-clear',
  code: 'code-tags',
  'code-block': 'code-tags',
  color: 'format-color-text',
  direction: {
    '': 'format-pilcrow-arrow-right',
    rtl: 'format-pilcrow-arrow-left',
  },
  formula: 'function-variant',
  header: {
    1: 'format-header-1',
    2: 'format-header-2',
  },
  italic: 'format-italic',
  image: 'image-plus',
  indent: {
    '+1': 'format-indent-increase',
    '-1': 'format-indent-decrease',
  },
  link: 'link',
  list: {
    bullet: 'format-list-bulleted',
    check: 'format-list-checks',
    ordered: 'format-list-numbered',
  },
  script: {
    sub: 'format-subscript',
    super: 'format-superscript',
  },
  strike: 'format-strikethrough',
  table: 'table-plus',
  underline: 'format-underline',
  video: 'video-plus',
};

export default mdiIcons;

const textColor = `
  <span style="position: relative;">
    <i class="icon mdi-format-color-text mdi v-icon notranslate v-theme--default"></i>
    <i class="icon mdi-color-helper mdi v-icon notranslate v-theme--default" style="position: absolute; top: 0; left: 0;"></i>
  </span>
`;

const bgColor = `
  <span style="position: relative;">
    <i class="icon mdi-format-color-highlight mdi v-icon notranslate v-theme--default"></i>
    <i class="icon mdi-color-helper mdi v-icon notranslate v-theme--default" style="position: absolute; top:0; left: 0;"></i>
  </span>
`;

export function getMdiIcon(name: string, value: string = '') {
  if (name === 'color') return textColor;
  if (name === 'background') return bgColor;
  const icon = mdiIcons[name];
  const code = isString(icon) ? icon : icon[value];
  return `<span class="icon mdi mdi-${code}"></span>`;
}
