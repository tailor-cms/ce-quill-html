<template>
  <div class="tce-container">
    <QuillEditor v-if="isFocused" v-model="content" />
    <div v-else class="ql-container ql-snow">
      <!-- eslint-disable vue/no-v-html -->
      <div v-if="!isEmpty" class="ql-editor" v-html="content"></div>
      <!-- eslint-enable -->
      <div v-else class="ql-editor placeholder">Enter your text...</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue';
import debounce from 'lodash/debounce';
import { Element } from '@tailor-cms/ce-quill-html-manifest';

import QuillEditor from './QuillEditor.vue';

interface Props {
  element: Element;
  isFocused?: boolean;
  isDisabled?: boolean;
  isDragged?: boolean;
  showPlaceholder?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isFocused: false,
  isDisabled: false,
  isDragged: false,
  showPlaceholder: true,
});
const emit = defineEmits(['save']);

const content = ref<string>(props.element.data.content ?? '');
const isEmpty = computed(() => !content.value.replace(/<[^>]*>/g, ''));
const hasChanges = computed(() => {
  const previousValue = props.element?.data?.content ?? '';
  return previousValue !== content.value;
});

const save = () => {
  if (!hasChanges.value) return;
  const { element } = props;
  emit('save', { ...element.data, content: content.value });
};

watch(
  () => props.isFocused,
  (val) => !val && save(),
);

watch(
  content,
  debounce(() => save(), 4000),
);
</script>

<style lang="scss" scoped>
.tce-container {
  text-align: left;
}

.ql-container.ql-snow {
  border: none;
  font-size: 1rem;
}

.placeholder {
  color: rgba(0, 0, 0, 0.5);
}

:deep(.ql-editor) {
  min-height: 5rem;
  padding: 0.5rem;

  &.ql-blank::before {
    width: 100%;
    color: rgba(0, 0, 0, 0.5);
    font-style: normal;
    left: 0.5rem;
    right: 0.5rem;
  }

  img {
    vertical-align: initial;
  }
}
</style>
