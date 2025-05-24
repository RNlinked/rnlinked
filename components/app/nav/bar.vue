<script setup lang="ts">
import { useIsMobile } from "~/stores/use-mobile";

const props = withDefaults(
  defineProps<{
    pageTitle?: string;
    right?: boolean;
    showNavigateBackBtn?: boolean;
    showLogoIcon?: boolean;
  }>(),
  {
    showNavigateBackBtn: false,
    showLogoIcon: false,
  }
);
const { isMobile, isPending } = useIsMobile();

const showLogo = computed(() => {
  if (!isMobile.value || isPending || props.pageTitle) {
    return false;
  }

  return true;
});
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
      <h2 v-if="pageTitle" class="text-lg font-medium">
        {{ props.pageTitle }}
      </h2>
      <Logo v-else-if="showLogo" :show-logo="props.showLogoIcon" />
    </div>
    <div>
      <slot v-if="props.right" name="right" />
      <AppNavItem
        v-else
        icon="solar:bell-bold"
        disabled
        route="/notifications"
      />
    </div>
  </nav>
</template>
