<script setup lang="ts">
import { cn } from "@/lib/utils";
import { shapeItems } from "~/lib/constants/shape-list";

const props = defineProps<{ reverseList?: boolean }>();
</script>
<template>
  <div class="overflow-hidden flex">
    <ul
      :class="
        cn(
          'flex gap-5',
          props.reverseList
            ? 'flex-row-reverse animate-scroll-reverse'
            : 'animate-scroll'
        )
      "
    >
      <li v-for="shape in [...shapeItems, ...shapeItems]">
        <AppLandingShape :shape="shape" />
      </li>
    </ul>
  </div>
</template>
