<script setup lang="ts">
const props = defineProps<{ data: object | null | undefined }>();
</script>
<template>
  <div class="max-w-lg overflow-scroll w-full">
    <pre>{{ JSON.stringify(props.data, null, 2) }}</pre>
  </div>
</template>
