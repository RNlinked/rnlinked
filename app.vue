<script setup lang="ts">
import { Toaster } from "./components/ui/sonner";

definePageMeta({
  title: "Trap",
});
</script>

<template>
  <NuxtLayout class="font-trap">
    <NuxtPage />
    <ClientOnly>
      <Toaster rich-colors position="top-center" />
    </ClientOnly>
  </NuxtLayout>
</template>
