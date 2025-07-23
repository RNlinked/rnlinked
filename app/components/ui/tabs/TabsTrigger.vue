<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { tabsTriggerVariants, type TabsTriggerVariants } from ".";
import { avatarVariants } from "../avatar";

const props = defineProps<
  TabsTriggerProps & {
    class?: HTMLAttributes["class"];
    variant?: TabsTriggerVariants["variant"];
  }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwardedProps"
    :class="cn(tabsTriggerVariants({ variant }), props.class)"
  >
    <slot />
  </TabsTrigger>
</template>
