<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
  <div class="tce-html-toolbar">
    <div id="quillToolbar" @mousedown.prevent="() => {}">
      <span class="ql-formats">
        <button class="ql-undo" data-title="Undo" type="button"></button>
        <button class="ql-redo" data-title="Redo" type="button"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-font" data-title="Font"></select>
        <select class="ql-header" data-title="Style"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold" data-title="Bold" type="button"></button>
        <button class="ql-italic" data-title="Italic" type="button"></button>
        <button
          class="ql-underline"
          data-title="Underline"
          type="button"
        ></button>
        <button
          class="ql-strike"
          data-title="Strikethrough"
          type="button"
        ></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color" data-title="Text color"></select>
        <select class="ql-background" data-title="Highlight color"></select>
      </span>
      <span class="ql-formats">
        <button
          class="ql-script"
          data-title="Subscript"
          type="button"
          value="sub"
        ></button>
        <button
          class="ql-script"
          data-title="Superscript"
          type="button"
          value="super"
        ></button>
      </span>
      <span class="ql-formats">
        <button
          class="ql-header"
          data-title="Heading 1"
          type="button"
          value="1"
        ></button>
        <button
          class="ql-header"
          data-title="Heading 2"
          type="button"
          value="2"
        ></button>
        <button class="ql-blockquote" data-title="Quote" type="button"></button>
        <button class="ql-code-block" data-title="Code" type="button"></button>
      </span>
      <span class="ql-formats">
        <button
          class="ql-list"
          data-title="Numbered list"
          type="button"
          value="ordered"
        ></button>
        <button
          class="ql-list"
          data-title="Bulleted List"
          type="button"
          value="bullet"
        ></button>
        <button
          class="ql-indent"
          data-title="Decrease indent"
          type="button"
          value="-1"
        ></button>
        <button
          class="ql-indent"
          data-title="Increase indent"
          type="button"
          value="+1"
        ></button>
      </span>
      <span class="ql-formats">
        <select class="ql-align" data-title="Alignment">
          <option selected></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
        <button
          class="ql-direction"
          data-title="Text direction"
          type="button"
          value="rtl"
        ></button>
      </span>
      <span class="ql-formats">
        <button
          class="ql-link"
          data-title="Insert link..."
          type="button"
        ></button>
        <button class="ql-image" data-title="Image" type="button"></button>
      </span>
      <span class="ql-formats">
        <button
          class="ql-clean"
          data-title="Clear formatting"
          type="button"
        ></button>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
$icon-color: #333;
$icon-accent-color: #ff6590;
$icon-size: 1.125rem;

.tce-html-toolbar {
  display: flex;
  align-items: center;
  height: 4.5rem;
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

  button:hover,
  button:focus {
    @include colorize($color: $icon-accent-color);
  }

  .ql-picker:not(.ql-expanded) .ql-picker-label:hover,
  .ql-picker-item:hover {
    @include colorize($color: $icon-accent-color);
  }

  button.ql-active,
  .ql-picker-label.ql-active {
    @include colorize(
      $color: $icon-accent-color,
      $background: lighten($icon-accent-color, 25%)
    );
  }

  .ql-picker-item.ql-selected {
    @include colorize($color: $icon-accent-color);
  }
}

.ql-toolbar .tooltip {
  $background-color: #2a2a2a;
  $text-color: #fff;
  $offset: 0.125rem;
  $arrow-size: 0.375rem;

  position: absolute;
  z-index: 999;
  display: block;
  margin-top: $arrow-size + $offset;
  border: 1px solid #fff;
  border-radius: 0;
  padding: 0.375rem 0.75rem;
  background: $background-color;
  cursor: default;
  line-height: 1.42;
  user-select: none;

  &-arrow {
    position: absolute;
    top: -$arrow-size;
    left: calc(50% - #{$arrow-size});
    margin: 0 $arrow-size;
    border: $arrow-size solid transparent;
    width: 0;
    height: 0;
    border-top-width: 0;
    border-bottom-color: $background-color;
  }

  &-inner {
    padding: 0;
    font-size: 0.96rem;
    font-weight: 500;
    text-align: center;
    color: $text-color;
  }
}
</style>
