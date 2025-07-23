<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { TabsList, type TabsListProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { tabsListVariants, type TabsListVariants } from ".";

const props = defineProps<
  TabsListProps & {
    class?: HTMLAttributes["class"];
    variant?: TabsListVariants["variant"];
  }
>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="cn(tabsListVariants({ variant }), props.class)"
  >
    <slot />
  </TabsList>
</template>
