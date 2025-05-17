<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  error?: string | null;
  label?: string;
  id?: string;
  placeholder?: string;
  icon?: string;
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
  <div class="spyace-y-2">
    <div class="flex items-center justify-between">
      <Label :for="props.label" class="py-1">{{ props.label }}</Label>
      <slot name="right-label" />
    </div>
    <div
      @click="focusInput"
      :class="
        cn(
          ' selection:bg-primary selection:text-primary-foreground dark:bg-input border-muted-foreground/70 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          ' flex-ctr gap-2 group',
          props.class
        )
      "
    >
      <Icon
        v-if="props.icon"
        :name="props.icon"
        size="24"
        @click="focusInput"
      />
      <input
        ref="inputRef"
        :id="props.label"
        v-model="modelValue"
        data-slot="input"
        :placeholder="props.placeholder"
        :class="
          cn(
            'file:text-foreground selection:bg-primary selection:text-primary-foreground  w-full min-w-0  bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm outline-none',
            props.class
          )
        "
      />
    </div>

    <p v-if="props.error" class="text-center text-xs text-contessa-500">
      {{ error }}
    </p>
  </div>
</template>
