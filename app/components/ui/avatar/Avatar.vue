<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { AvatarRoot } from "reka-ui";
import { cn } from "@/lib/utils";
import { avatarVariants, type AvatarVariants } from ".";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  size?: AvatarVariants["size"];
  radius?: AvatarVariants["radius"];
}>();
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :class="cn(avatarVariants({ size, radius }), props.class)"
  >
    <slot />
  </AvatarRoot>
</template>
