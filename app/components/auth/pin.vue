<script setup lang="ts">
const props = defineProps<{
  error?: string;
  label?: string;
  modelValue?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

// Convert string to array for PinInput
const inputArray = ref(props.modelValue?.split("") ?? Array(6).fill(""));

// Sync parent-to-local on prop change
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== inputArray.value.join("")) {
      inputArray.value = newVal?.split("") ?? Array(6).fill("");
    }
  }
);

// Emit joined string to parent on local change
watch(
  inputArray,
  (newVal) => {
    emit("update:modelValue", newVal.join(""));
  },
  { deep: true }
);
</script>
<template>
  <div>
    <Label for="pin-input" class="py-1.5">{{ props.label }}</Label>
    <PinInput
      id="pin-input"
      placeholder="○"
      otp
      type="text"
      v-model="inputArray"
      class="w-full flex-ctr"
    >
      <PinInputGroup class="w-full">
        <PinInputSlot v-for="(id, index) in 6" :key="id" :index="index" />
      </PinInputGroup>
    </PinInput>
    <p v-if="error" class="text-xs text-contessa-500 py-1.5">
      {{ props.error }}
    </p>
  </div>
</template>
