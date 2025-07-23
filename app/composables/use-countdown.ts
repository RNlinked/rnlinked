import { ref, computed, watchEffect, onUnmounted } from "vue";

const STORAGE_KEY = "countdown_timer";
// const storedCountdown = localStorage.getItem(STORAGE_KEY);
// const initialCountdown = storedCountdown
//   ? parseInt(storedCountdown, 10)
//   : DEFAULT_COUNTDOWN;

export function useCountdown(initial = 0) {
  const countdown = ref(initial);
  const isRunning = ref(false);
  const enabled = computed(() => countdown.value <= 0);

  let timer: ReturnType<typeof setInterval> | null = null;

  const calculateRemaining = (expiry: number) => {
    const remaining = Math.floor((expiry - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  };

  const resumeCountdown = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const expiry = parseInt(stored, 10);
      const remaining = calculateRemaining(expiry);
      if (remaining > 0) {
        countdown.value = remaining;
        startInternal();
      } else {
        stopCountdown();
      }
    }
  };

  const startCountdown = (duration: number) => {
    const expiry = Date.now() + duration * 1000;
    localStorage.setItem(STORAGE_KEY, expiry.toString());
    countdown.value = duration;
    startInternal();
  };

  const startInternal = () => {
    isRunning.value = true;
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value <= 0) {
        stopCountdown();
      }
    }, 1000);
  };

  const stopCountdown = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    isRunning.value = false;
    countdown.value = 0;
    localStorage.removeItem(STORAGE_KEY);
  };

  onMounted(() => {
    resumeCountdown();
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return {
    countdown,
    isRunning,
    enabled,
    startCountdown,
    stopCountdown,
  };
}
