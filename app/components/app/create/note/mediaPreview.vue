<script setup lang="ts">
const { removeFile } = useUploader();
const isVideo = (file: File) => file.type.startsWith("video");
const noteStore = useNoteStore();
</script>

<template>
  <div
    className="flex gap-2 overflow-x-auto max-sm:overflow-x-hidden max-sm:gap-1"
  >
    <div v-for="(url, i) in noteStore.previewUrls" :key="i" class="relative">
      <img
        v-if="noteStore.files[i] && !isVideo(noteStore.files[i])"
        :src="url"
        class="w-16 h-16 object-cover rounded-md"
        :alt="`Preview of ${noteStore.files[i].name}`"
      />
      <video
        v-else
        :src="url"
        class="w-28 h-28 object-cover rounded-md"
        controls
        :alt="`Preview of ${noteStore.files[i] && noteStore.files[i].name}`"
      />

      <button
        type="button"
        class="absolute top-0.5 right-0.5 bg-white rounded-full size-5 flex-ctr-ctr text-red-500 hover:bg-red-100"
        @click="removeFile(i)"
      >
        <span class="sr-only">Remove file</span>
        x
      </button>
    </div>
  </div>
</template>
