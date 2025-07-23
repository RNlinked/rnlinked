<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  error?: string | null;
  label?: string;
  id?: string;
  placeholder?: string;
  icon?: string;
  type?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const inputRef = ref<HTMLInputElement | null>(null);

function focusInput() {
  inputRef.value?.focus();
}
</script>

<template>
  <div class="space-y-1">
    <div class="flex items-center justify-between">
      <Label :for="props.label" class="py-1">{{ props.label }}</Label>
      <slot name="right-label" />
    </div>

    <div class="relative w-full">
      <input
        :type="type"
        :id="props.label"
        ref="inputRef"
        v-model="modelValue"
        data-slot="input"
        :placeholder="props.placeholder"
        :class="
          cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            props.icon && 'pl-10',
            props.class
          )
        "
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        v-show="props.icon"
      >
        <Icon
          v-if="props.icon"
          :name="props.icon"
          size="24"
          @click="focusInput"
        />
      </span>
    </div>
    <p v-if="props.error" class="text-xs text-contessa-500">
      {{ error }}
    </p>
  </div>
</template>
