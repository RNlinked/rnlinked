<script setup lang="ts">
const auth = useAuth();
definePageMeta({
  layout: "auth-layout",
  auth: {
    only: "guest",
  },
});
</script>
<template>
  <h1 class="font-semibold text-lg">Welcome back</h1>
  <AuthOptions />
</template>
