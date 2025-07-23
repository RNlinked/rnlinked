<script setup lang="ts">
import { cn } from "@/lib/utils";
import { type NavItemProps } from "./types";
import { toast } from "vue-sonner";

const props = defineProps<NavItemProps>();

const active = computed(() => props.route === useRoute().path);
const handleClick = () => {
  if (props.disabled) {
    toast.info(props.disabledMessage || "This feature is not available yet");
    return;
  }

  if (props.route) {
    navigateTo(props.route);
  }
  if (props.onClick) {
    props.onClick();
  }
};
</script>
<template>
  <Button
    variant="ghost"
    :label="props.label"
    :icon="props.icon"
    icon-size="24"
    @click="handleClick"
    :class="
      cn(
        'justify-start text-lg lg:text-xl tracking-wide cursor-pointer hover-bg w-fit',
        props.disabled && 'cursor-not-allowed',
        active && 'text-tradewind-500 app-bg',
        props.class
      )
    "
  />
</template>
