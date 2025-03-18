<template>
  <div class="ce-html-root">
    <!-- eslint-disable-next-line -->
    <span v-html="data.content" />
  </div>
</template>

<script setup lang="ts">
import { ElementData } from '@tailor-cms/ce-quill-html-manifest';

defineProps<{ id: number; data: ElementData }>();
</script>

<style scoped lang="scss">
.ce-html-root {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
}
</style>
