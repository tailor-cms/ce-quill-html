<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
  <div class="tce-html-toolbar">
    <div id="quillToolbar" @mousedown.prevent="() => {}">
      <span class="ql-formats">
        <button aria-label="Undo" class="ql-undo" type="button"></button>
        <button aria-label="Redo" class="ql-redo" type="button"></button>
      </span>
      <span class="ql-formats">
        <select aria-label="Font" class="ql-font"></select>
        <select aria-label="Style" class="ql-header"></select>
      </span>
      <span class="ql-formats">
        <button aria-label="Bold" class="ql-bold" type="button"></button>
        <button aria-label="Italic" class="ql-italic" type="button"></button>
        <button
          aria-label="Underline"
          class="ql-underline"
          type="button"
        ></button>
        <button
          aria-label="Strikethrough"
          class="ql-strike"
          type="button"
        ></button>
      </span>
      <span class="ql-formats">
        <select aria-label="Text color" class="ql-color"></select>
        <select aria-label="Highlight color" class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <button
          aria-label="Subscript"
          class="ql-script"
          type="button"
          value="sub"
        ></button>
        <button
          aria-label="Superscript"
          class="ql-script"
          type="button"
          value="super"
        ></button>
      </span>
      <span class="ql-formats">
        <button
          aria-label="Heading 1"
          class="ql-header"
          type="button"
          value="1"
        ></button>
        <button
          aria-label="Heading 2"
          class="ql-header"
          type="button"
          value="2"
        ></button>
        <button aria-label="Quote" class="ql-blockquote" type="button"></button>
        <button aria-label="Code" class="ql-code-block" type="button"></button>
      </span>
      <span class="ql-formats">
        <button
          aria-label="Numbered list"
          class="ql-list"
          type="button"
          value="ordered"
        ></button>
        <button
          aria-label="Bulleted List"
          class="ql-list"
          type="button"
          value="bullet"
        ></button>
        <button
          aria-label="Decrease indent"
          class="ql-indent"
          type="button"
          value="-1"
        ></button>
        <button
          aria-label="Increase indent"
          class="ql-indent"
          type="button"
          value="+1"
        ></button>
      </span>
      <span class="ql-formats">
        <select aria-label="Alignment" class="ql-align">
          <option selected></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
        <button
          aria-label="Text direction"
          class="ql-direction"
          type="button"
          value="rtl"
        ></button>
      </span>
      <span class="ql-formats">
        <button
          aria-label="Insert link..."
          class="ql-link"
          type="button"
        ></button>
        <button aria-label="Image" class="ql-image" type="button"></button>
      </span>
      <span class="ql-formats">
        <button
          aria-label="Clear formatting"
          class="ql-clean"
          type="button"
        ></button>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
$icon-color: #333;
$icon-accent-color: #607d8b;
$icon-size: 1.5rem;

.tce-html-toolbar {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  text-align: initial;
}

.ql-toolbar .icon {
  width: $icon-size;
  height: $icon-size;
  font-size: $icon-size;
  line-height: $icon-size;
  color: $icon-color;
  vertical-align: top;
}

.ql-toolbar .ql-direction {
  span:last-child {
    display: none;
  }

  &.ql-active {
    span:last-child {
      display: initial;
    }

    span:first-child {
      display: none;
    }
  }
}

.ql-formats {
  display: inline-flex !important;
  margin-right: unset !important;
  gap: 0.125rem;

  + .ql-formats::before {
    content: '';
    display: block;
    width: 1px;
    background: #e6e6e6;
    margin: 0.125rem;
  }

  .ql-picker-label {
    border: none !important;
  }

  .ql-picker-label:hover,
  .ql-picker.ql-expanded {
    border: none !important;

    .ql-picker-label {
      background: rgba($icon-color, 0.08);
    }
  }

  button,
  .ql-color-picker .ql-picker-label,
  .ql-icon-picker .ql-picker-label {
    padding: 0;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button,
  .ql-color-picker,
  .ql-icon-picker {
    width: 2rem !important;
    height: 2rem !important;
    padding: 0 !important;
  }

  .ql-header:not(button),
  .ql-font {
    width: unset !important;
    height: 2rem;

    .ql-picker-label {
      display: flex;
      align-items: center;
      padding: 0 1.5rem 0 0.5rem;
      border-radius: 8px;
      font-size: 1rem;
    }
  }
}

.ql-toolbar.ql-snow {
  border: none;

  @mixin colorize($color, $background: none) {
    background: $background;
    color: $icon-accent-color;

    .icon {
      color: inherit;
    }

    .ql-stroke {
      stroke: currentcolor;
    }

    .ql-fill {
      fill: currentcolor;
    }
  }

  button.ql-active,
  .ql-picker-label.ql-active {
    @include colorize(
      $color: $icon-accent-color,
      $background: rgba($icon-accent-color, 0.12)
    );
  }

  .ql-picker-item.ql-selected {
    @include colorize($color: $icon-accent-color);
  }
}

.ql-toolbar .tippy-box {
  $background-color: #2a2a2a;
  $text-color: #fff;
  $arrow-size: 0.375rem;

  padding: 0.375rem 0.75rem;
  background: rgba($background-color, 0.9);
  border-radius: 8px;

  .tippy-arrow {
    top: -$arrow-size;
    border: $arrow-size solid transparent;
    border-top-width: 0;
    border-bottom-color: rgba($background-color, 0.9);
  }

  .tippy-content {
    padding: 0;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    color: $text-color;
  }
}
</style>
