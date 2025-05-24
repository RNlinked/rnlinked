<script setup lang="ts">
// import { SidebarProvider } from "~/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <slot />
      <AppNavMobile />
    </SidebarInset>
  </SidebarProvider>
</template>
