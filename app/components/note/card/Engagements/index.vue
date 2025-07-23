<script setup lang="ts">
import type { Note } from "~/lib/types";
import { cn } from "~/lib/utils";

const props = defineProps<{
  likeCount?: number;
  replyCount?: number;
  detailedView?: boolean;
  isThread?: boolean;
  readOnly?: boolean;
  note: Note;
}>();
</script>
<template>
  <div
    :class="
      cn(
        'flex items-center gap-2 -ml-1 text-muted-foreground',
        detailedView && 'border-y justify-between mt-3',
        isThread && 'pb-3'
      )
    "
  >
    <NoteCardEngagementsLike :like-count="props.likeCount" />
    <NoteCardEngagementsReply
      :reply-count="props.replyCount"
      :note="note"
      :read-only="props.readOnly"
    />
    <NoteCardEngagementsSave :read-only="props.readOnly" />
    <NoteCardEngagementsShare :read-only="props.readOnly" />
  </div>
</template>
