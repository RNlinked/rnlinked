import { ref, onMounted, onUnmounted } from "vue";

const MOBILE_BREAKPOINT = 640;

export function useIsMobile() {
  const isMobile = ref<boolean | undefined>(undefined);

  const isPending = typeof window === "undefined";

  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
  };

  onMounted(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    mql.addEventListener("change", updateIsMobile);
    updateIsMobile();

    onUnmounted(() => {
      mql.removeEventListener("change", updateIsMobile);
    });
  });

  return { isMobile, isPending };
}
