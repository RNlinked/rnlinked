<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
  body: string;
  class?: HTMLAttributes["class"];
}>();
const { transformMentionsAndLinks } = useHtmlTransformer();
const transformedBody = computed(() => transformMentionsAndLinks(props.body));
</script>
<template>
  <p
    v-html="transformedBody"
    :class="
      cn(' tiptap sm:font-thin sm:text- text-accent-foreground', props.class)
    "
  ></p>
</template>
