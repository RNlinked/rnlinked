<script setup lang="ts">
import { cn } from "@/lib/utils";

const colorMode = useColorMode();

const modes = [
  {
    mode: "light",
    icon: "solar:sun-2-bold",
  },
  {
    mode: "dark",
    icon: "solar:moon-stars-bold",
  },
  {
    mode: "system",
    icon: "solar:monitor-smartphone-bold-duotone",
  },
];
</script>
<template>
  <div class="flex-ctr gap-[1px]">
    <Button
      variant="ghost"
      v-for="m in modes"
      :key="m.mode"
      :label="m.mode"
      :icon="m.icon"
      icon-size="20"
      @click="colorMode.preference = m.mode"
      :class="
        cn(
          'capitalize px-2 first:rounded-l-lg -my-1 last:rounded-r-lg rounded-none h-8 ',
          colorMode.preference === m.mode
            ? ' bg-tradewind-700 text-white hover:bg-tradewind-700/90 font-medium'
            : 'dark:bg-neutral-500/50  '
        )
      "
    />
  </div>
</template>
