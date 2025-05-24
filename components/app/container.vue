<script setup lang="ts">
type AppContainerProps = {
  showBackBtn?: boolean;
  pageTitle?: string;
  rightNavItem?: boolean;
};

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
    <div class="md:mx-auto max-w-2xl w-full md:shrink-0 px-3 md:pt-2">
      <slot />
    </div>
  </div>
</template>
