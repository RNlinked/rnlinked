<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

interface Props {
  class?: HTMLAttributes["class"];
  showLogo?: boolean;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  src?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  showLogo: true,
  showText: true,
  size: "md",
  src: "/logo-new.svg",
});
</script>

<template>
  <NuxtLink
    to="/"
    :class="cn('flex items-center gap-2 text-lg md:text-xl', props.class)"
  >
    <img v-if="showLogo" :src="src" class="h-9 w-auto" alt="Logo" />
    <span v-if="showText" class="font-semibold font-trap"> RNlinked</span>
  </NuxtLink>
</template>
