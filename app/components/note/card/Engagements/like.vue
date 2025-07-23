<script setup lang="ts">
const props = defineProps<{
  likeCount?: number;
}>();
</script>
<template>
  <div class="flex items-center gap -ml-1">
    <Button
      icon="solar:heart-angle-line-duotone"
      size="icon"
      variant="ghost"
      icon-size="19"
      class="text-muted-foreground hover:text-foreground"
    />
    <span
      v-if="(props.likeCount ?? 0) > 0"
      class="text-muted-foreground text-xs"
    >
      {{ props.likeCount ?? 0 }}
    </span>
  </div>
</template>
