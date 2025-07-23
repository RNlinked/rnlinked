<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
  auth: {
    only: "guest",
  },
});
</script>
<template>
  <h1 class="font-semibold text-lg">Create your account</h1>
  <AuthOptions />
</template>
