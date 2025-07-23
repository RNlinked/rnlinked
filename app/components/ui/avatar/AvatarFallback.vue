<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { AvatarFallback, type AvatarFallbackProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { avatarVariants, type AvatarVariants } from ".";

const props = defineProps<
  AvatarFallbackProps & {
    class?: HTMLAttributes["class"];
    size?: AvatarVariants["size"];
    radius?: AvatarVariants["radius"];
  }
>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="delegatedProps"
    :class="
      cn(
        avatarVariants({ size, radius }),
        'bg-muted font-semibold',
        props.class
      )
    "
  >
    <slot />
  </AvatarFallback>
</template>
