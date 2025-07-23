<script setup lang="ts">
import type { Note } from "~/lib/types";

const props = defineProps<{
  replyCount?: number;
  note: Note;
  readOnly?: boolean;
}>();

const { openReply } = useNoteStore();
</script>

<template>
  <div class="flex items-center gap -ml-1">
    <Button
      icon="solar:chat-square-arrow-outline"
      size="icon"
      variant="ghost"
      class="text-muted-foreground hover:text-foreground"
      icon-size="19"
      @click.stop="!props.readOnly ? () => openReply(note) : () => {}"
    />
    <span
      v-if="(props.replyCount ?? 0) > 0"
      class="text-muted-foreground text-xs"
    >
      {{ props.replyCount ?? 0 }}
    </span>
  </div>
</template>
