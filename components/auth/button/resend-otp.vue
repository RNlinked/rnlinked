<script setup lang="ts">
const props = defineProps<{
  countdown: number;
  resendEnabled: boolean;
  email?: string;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <p class="text-center text-sm py-5">
    Didn&apos;t receive a code?
    <Button
      type="button"
      variant="link"
      class="-m-2.5 text-tradewind-500 font-bold"
      :label="`Resend code ${countdown || ''}`"
      :disabled="!resendEnabled"
      @click="$emit('click')"
    />
  </p>
</template>
