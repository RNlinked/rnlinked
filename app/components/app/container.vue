<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

type AppContainerProps = {
  showBackBtn?: boolean;
  pageTitle?: string;
  rightNavItem?: boolean;
  innerWidth?: VariantProps<typeof containerContentVariants>["innerWidth"];
};

const containerContentVariants = cva(" w-full md:shrink-0 px-3 md:pt-2", {
  variants: {
    innerWidth: {
      md: "max-w-md mx-auto",
      lg: "max-w-lg mx-auto",
      xl: "max-w-xl mx-auto",
      "2xl": "max-w-2xl mx-auto",
      "3xl": "max-w-3xl mx-auto",
      full: "w-full",
    },
  },
  defaultVariants: {
    innerWidth: "2xl",
  },
});

const props = withDefaults(defineProps<AppContainerProps>(), {});
</script>
<template>
  <div class="pb-10 max-md:pb-32 w-full">
    <AppNavBar
      :show-navigate-back-btn="props.showBackBtn"
      :page-title="pageTitle"
      :right="props.rightNavItem"
    >
      <template #right>
        <slot name="right-nav-item" />
      </template>
    </AppNavBar>
    <div :class="cn(containerContentVariants({ innerWidth }))">
      <slot />
    </div>
  </div>
</template>
