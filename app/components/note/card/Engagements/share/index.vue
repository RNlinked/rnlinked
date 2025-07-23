<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
</script>

<template>
  <Button
    icon="solar:share-line-duotone"
    size="icon"
    variant="ghost"
    class="text-muted-foreground hover:text-foreground"
    @click="$emit('share')"
    icon-size="18"
  />
</template>
