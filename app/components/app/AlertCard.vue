<script setup lang="ts">
const props = defineProps<{
  title: string;
  message?: string;
}>();
</script>

<template>
  <div class="max-w-xl mx-auto w-full text-lg my-8 p-4">
    <Alert>
      <Icon name="solar:info-circle-linear" mode="svg" />
      <AlertTitle class="text-lg">{{ title }}</AlertTitle>
      <AlertDescription class="text-sm">{{ message }}</AlertDescription>
    </Alert>
  </div>
</template>
