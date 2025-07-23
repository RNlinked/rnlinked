<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HtmlHTMLAttributes } from "vue";

const props = defineProps<{ class?: HtmlHTMLAttributes["class"] }>();
</script>
<template>
  <div
    :class="
      cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent h-4 w-4',
        props.class
      )
    "
  />
</template>
