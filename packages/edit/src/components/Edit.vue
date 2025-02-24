<template>
  <div class="tce-container">
    <ElementPlaceholder
      v-if="!isFocused && !content && showPlaceholder"
      :is-disabled="isDisabled"
      :is-focused="isFocused"
      :name="`${manifest.name} component`"
      active-icon="mdi-arrow-up"
      active-placeholder="Use toolbar to upload the image"
      icon="mdi-image-plus"
    />
    <template v-else>
      <QuillEditor v-if="isFocused" v-model="content" />
      <div v-else class="ql-container ql-snow">
        <!-- eslint-disable vue/no-v-html -->
        <div class="ql-editor" v-html="content"></div>
        <!-- eslint-enable -->
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue';
import manifest, { Element } from '@tailor-cms/ce-quill-html-manifest';
import { ElementPlaceholder } from '@tailor-cms/core-components';

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
defineEmits(['save']);

const content = ref<string>(props.element.data.content ?? '');
</script>

<style scoped>
.tce-container {
  text-align: left;
}

.ql-container.ql-snow {
  border: none;
  font-size: 1rem;
}
</style>
