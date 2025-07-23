<script setup lang="ts">
import type { AvatarVariants } from "~/components/ui/avatar";

const props = defineProps<{
  src?: string;
  username?: string;
  size?: AvatarVariants["size"];
  radius?: AvatarVariants["radius"];
}>();

const fallbackText = computed(
  () => (props.username ? props.username.charAt(0).toUpperCase() : "U") // Default to 'U' if no username is provided
);
</script>
<template>
  <NuxtLink :to="`/${props.username}`">
    <Avatar :size="props.size" :radius="props.radius">
      <AvatarImage :src="props.src || ''" :alt="`${props.username}'s avatar`" />
      <AvatarFallback :size="props.size" :radius="props.radius">{{
        fallbackText
      }}</AvatarFallback>
    </Avatar>
  </NuxtLink>
</template>
