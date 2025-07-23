<script setup lang="ts"></script>
<template>
  <Button
    icon="solar:bookmark-linear"
    size="icon"
    variant="ghost"
    class="text-muted-foreground hover:text-foreground"
    @click="$emit('save')"
    icon-size="18"
  />
</template>
