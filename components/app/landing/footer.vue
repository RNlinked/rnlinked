<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="hidden border-t row-start-3 sm:flex gap-6 flex-wrap items-center justify-center p-10"
  >
    <NuxtLink to="#" class="hover:underline hover:underline-offset-4">
      Privacy
    </NuxtLink>
    <NuxtLink to="#" class="hover:underline hover:underline-offset-4">
      Terms
    </NuxtLink>
    <small>Ⓒ {{ currentYear }} RNLinked</small>
  </footer>
</template>
