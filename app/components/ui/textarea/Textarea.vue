<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  defaultValue?: string | number;
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  id?: string;
  rows?: number;
  cols?: number;
  error?: string | null;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div class="space-y-1">
    <div class="flex items-center justify-between">
      <Label :for="props.label" class="py-1">{{ props.label }}</Label>
      <slot name="right-label" />
    </div>
    <textarea
      v-model="modelValue"
      data-slot="textarea"
      :id="props.label"
      :placeholder="props.placeholder"
      :rows="props.rows || 4"
      :class="
        cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          props.class
        )
      "
    />
    <p v-if="props.error" class="text-xs text-contessa-500">
      {{ error }}
    </p>
  </div>
</template>
