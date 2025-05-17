<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    pageCtx?: string;
    right?: string;
    showNavigateBackBtn?: boolean;
    showLogoIcon?: boolean;
  }>(),
  {
    pageCtx: undefined,
    right: undefined,
    showNavigateBackBtn: false,
    showLogoIcon: false,
  }
);
</script>

<template>
  <nav
    class="py-3 px-2 sm:px-4 flex-ctr-btw sm:border-b sticky top-0 z-50 bg-background"
  >
    <div class="flex-ctr gap-8">
      <Button
        v-if="props.showNavigateBackBtn"
        @click="$router.back()"
        variant="ghost"
        size="icon"
        icon="solar:arrow-left-outline"
        class="rounded-full"
      />
      <h2 class="text-lg font-medium">{{ props.pageCtx }}</h2>
    </div>
    <div>
      {{ props.right }}
    </div>
  </nav>
</template>
