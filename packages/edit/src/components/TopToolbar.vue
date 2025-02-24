<template>
  <EditorToolbar />
</template>

<script setup lang="ts">
import EditorToolbar from './EditorToolbar.vue';

defineProps<{ element: Element }>();
defineEmits(['save']);
</script>

<style scoped></style>
