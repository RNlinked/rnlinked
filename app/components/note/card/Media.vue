<script setup lang="ts">
import type { Media } from "~/lib/types";

const props = defineProps<{
  media: Media[];
}>();
</script>
<template>
  <div v-if="props.media && props.media.length > 0" class="my-0.5">
    <div v-if="props.media.length === 1">
      <img
        v-if="props.media[0]?.type === 'image'"
        class="w-80 h-auto rounded-lg shadow-md"
        :src="props.media[0]?.url"
        alt="Media content"
      />
      <video
        v-else-if="props.media[0]?.type === 'video'"
        class="w-full h-auto rounded-lg shadow-md"
        controls
        :src="props.media[0]?.url"
      />
    </div>

    <Carousel show-nav-buttons v-else-if="props.media.length > 1">
      <div
        v-for="item in props.media"
        :key="item.id"
        class="rounded-lg shrink-0 ring ring-muted shadow first:ml-2 last:mr-2"
      >
        <img
          v-if="item.type === 'image'"
          class="w-64 h-full rounded-lg shadow-md object-cover"
          :src="item.url"
          alt="Media content"
        />
        <video
          v-else-if="item.type === 'video'"
          class="w-full h-auto rounded-lg shadow-md"
          controls
          :src="item.url"
        />
      </div>
    </Carousel>
  </div>
</template>
