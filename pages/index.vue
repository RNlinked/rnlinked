<script setup lang="ts">
definePageMeta({
  layout: "app-layout",
});

const auth = await useAuth();
</script>
<template>
  <AppContainer>
    <Spinner v-if="auth.loading" :size="32" />
    <JsonData :data="auth.user" />

    Home page
    {{ auth.user?.email }}
    {{ auth.loading }}
  </AppContainer>
</template>
