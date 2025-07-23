<script setup lang="ts">
import { Select as SelectPrimitive } from "../ui/select";

type SelectItemValue = {
  value: string;
  label: string;
};

const props = defineProps<{
  items: SelectItemValue[];
  defaultValue?: string;
}>();
</script>

<template>
  <SelectPrimitive
    :default-value="props.defaultValue"
    class="select select-bordered w-full max-w-xs"
  >
    <SelectTrigger>
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="item in props.items"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </SelectItem>
    </SelectContent>
  </SelectPrimitive>
</template>
