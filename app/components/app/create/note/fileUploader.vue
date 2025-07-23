<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";

const { handleFileChange } = useUploader();
</script>
<template>
  <label for="media" class="cursor-pointer">
    <span class="sr-only">Upload files</span>
    <Icon
      name="solar:camera-add-broken"
      :size="28"
      :class="
        buttonVariants({
          variant: 'ghost',
          size: 'icon',
          class: 'text-muted-foreground hover-bg',
        })
      "
    />
    <input
      type="file"
      id="media"
      name="media"
      multiple
      accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
      class="hidden border-none bg-transparent outline-hidden"
      @change="handleFileChange"
    />
  </label>
</template>
