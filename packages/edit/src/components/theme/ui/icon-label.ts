import type Picker from 'quill/ui/picker';

const getIcon = (select: HTMLSelectElement, value: string | null) => {
  if (select.classList.contains('ql-header')) {
    return `format-header-${value ?? 'pound'}`;
  }
  return 'format-font';
};

// Renders the picker label as an icon with a dropdown chevron, matching the
// TipTap and Jodit toolbars, instead of the selected option's text. The
// options list keeps its text labels.
export const useIconLabel = (picker: Picker) => {
  const { label, select } = picker;
  const render = () => {
    const icon = getIcon(select, label.getAttribute('data-value'));
    label.innerHTML = `
      <span class="icon mdi mdi-${icon}"></span>
      <span class="ql-picker-chevron mdi mdi-menu-down"></span>
    `;
  };
  // The visible text is gone, so name the control for assistive tech
  const name = select.getAttribute('aria-label');
  if (name) label.setAttribute('aria-label', name);
  const selectItem = picker.selectItem.bind(picker);
  picker.selectItem = (...args: Parameters<Picker['selectItem']>) => {
    selectItem(...args);
    render();
  };
  render();
};
