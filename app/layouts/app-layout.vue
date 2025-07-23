<script setup lang="ts"></script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <slot />
      <AppNavMobile />
    </SidebarInset>
  </SidebarProvider>
</template>
