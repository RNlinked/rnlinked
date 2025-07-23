<script setup lang="ts">
import type { User } from "~/lib/types";
import { formatDate } from "~/lib/utils/timeFormat";

const props = defineProps<{
  author: User;
  createdAt?: string;
  readOnly?: boolean;
}>();

const formatedDate = formatDate({
  isoDateString: props.createdAt ?? "",
  showTime: true,
  showYear: true,
});
</script>
<template>
  <div class="w-full">
    <div class="flex-ctr-btw gap-2 w-full">
      <div class="flex-ctr gap-2">
        <h3 class="cursor-pointer hover:underline text-accent-foreground">
          {{ author.name }}
        </h3>
        <p class="text-muted-foreground text-sm capitalize">
          Digital nurse specialist
        </p>
      </div>
      <Button
        v-if="!readOnly"
        size="icon"
        variant="ghost"
        icon-size="18"
        icon="solar:menu-dots-bold"
        class="text-muted-foreground hover:text-foreground -my-3 -mx-2.5"
      />
    </div>
    <small class="font-light text-xs text-muted-foreground -mt-0.5 mb-1 block">
      {{ formatedDate }}
    </small>
  </div>
</template>
