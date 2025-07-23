<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps } from "reka-ui";
import { type ButtonVariants, buttonVariants } from ".";
import { Spinner } from "../spinner";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  iconSize?: string;
  class?: HTMLAttributes["class"];
  icon?: string;
  label?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  label: undefined,
  iconSize: "28",
});
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <Icon v-if="icon" :name="icon" :size="props.iconSize" />
    <span v-if="label">{{ label }}</span>
    <slot v-else />
    <Spinner v-if="loading" />
  </Primitive>
</template>
