<template>
  <QuillyEditor
    ref="editor"
    :model-value="modelValue"
    :options="options"
    @ready="onQuillReady"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script lang="ts" setup>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { defineEmits, defineProps, onMounted, ref } from 'vue';
import Quill from 'quill';
import { QuillyEditor } from 'vue-quilly';

import createCustomTheme from './theme/index';

const CustomTheme = createCustomTheme();
Quill.register(`themes/${CustomTheme.NAME}`, CustomTheme, true);

const props = defineProps<{
  modelValue: string;
}>();
defineEmits(['update:modelValue']);

const editor = ref<InstanceType<typeof QuillyEditor>>();
let quill: Quill | null = null;

const options = {
  theme: CustomTheme.NAME,
  modules: {
    toolbar: {
      container: '#quillToolbar',
      handlers: {
        redo() {
          quill?.history.redo();
        },
        undo() {
          quill?.history.undo();
        },
      },
    },
  },
  placeholder: 'Enter your text...',
  readOnly: false,
};

const onQuillReady = (quill: Quill) => {
  quill.focus();
  if (quill.root) {
    quill.root.innerHTML = props.modelValue;
  }
};

onMounted(() => {
  quill = editor.value?.initialize(Quill) ?? null;
});
</script>
