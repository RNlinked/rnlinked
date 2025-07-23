<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted, nextTick } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
// import { useAppStates } from "@/composables/useAppStates";
import { cn } from "@/lib/utils";

const props = defineProps({
  className: String,
  showNavButtons: {
    type: Boolean,
    default: true,
  },
});

const scrollContainerRef = ref<HTMLDivElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);
const { isMobile } = useIsMobile();

const handleScroll = () => {
  const container = scrollContainerRef.value;
  if (container) {
    canScrollLeft.value = container.scrollLeft > 0;
    canScrollRight.value =
      container.scrollLeft < container.scrollWidth - container.clientWidth;
  }
};

const handleScrollWithNavButtons = (dir: "left" | "right") => {
  const container = scrollContainerRef.value;
  if (container) {
    const scrollAmount = Math.min(container.clientWidth * 0.8, 500);
    container.scrollBy({
      left: dir === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }
};

const handleResize = () => handleScroll();

onMounted(() => {
  handleScroll();
  window.addEventListener("resize", handleResize);
  nextTick(() => handleScroll());
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="relative w-full">
    <!-- Left Scroll Button -->
    <button
      v-if="!isMobile && props.showNavButtons"
      @click.stop="handleScrollWithNavButtons('left')"
      :disabled="!canScrollLeft"
      class="absolute top-1/2 -translate-y-1/2 -left-2 z-10 h-8 w-8 rounded-full bg-white dark:bg-slate-600/50 hover:dark:bg-slate-600/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      <ChevronLeft class="w-4 h-4" />
    </button>

    <!-- Scrollable Content -->
    <div
      ref="scrollContainerRef"
      class="overflow-x-auto scrollbar-hide py-1 w-full"
      @scroll="handleScroll"
    >
      <div class="flex gap-3 mr-8">
        <slot />
      </div>
    </div>

    <!-- Right Scroll Button -->
    <button
      v-if="!isMobile && props.showNavButtons"
      @click.stop="handleScrollWithNavButtons('right')"
      :disabled="!canScrollRight"
      class="absolute top-1/2 -translate-y-1/2 -right-2 z-10 h-8 w-8 rounded-full bg-white dark:bg-slate-600/50 hover:dark:bg-slate-600/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      <ChevronRight class="w-4 h-4" />
    </button>
  </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
