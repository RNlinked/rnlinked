<script setup lang="ts">
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtPage />
    <ClientOnly> <Toaster rich-colors position="top-center" /></ClientOnly>
    <AppCreateNote />
  </NuxtLayout>
</template>
