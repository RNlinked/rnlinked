<script setup lang="ts">
import type { Note } from "~/lib/types";
import { cn } from "~/lib/utils";
const router = useRouter();

const props = defineProps<{
  note: Note;
  isThread?: boolean;
  detailedView?: boolean;
  readOnly?: boolean;
  hideEngagements?: boolean;
}>();
</script>
<template>
  <div
    :class="
      cn(
        'relative flex gap-3  px-3 max-w-lg w-full transition-colors',
        props.readOnly
          ? 'cursor-default'
          : ' cursor-pointer  hover:bg-muted/40',
        detailedView ? 'py-0 ' : isThread ? 'py-0' : 'border-b py-3'
      )
    "
    @click="
      !props.readOnly
        ? $router.push(`/${props.note.author.username}/n/${props.note.id}`)
        : () => {}
    "
  >
    <div
      v-if="isThread"
      class="absolute left-7 top-9 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700"
    />
    <AppUserAvatar
      v-if="!detailedView"
      :username="props.note.author.username"
      radius="full"
      size="xs"
    />
    <div class="w-full">
      <div class="flex gap-3 w-full">
        <AppUserAvatar
          v-if="detailedView"
          :username="props.note.author.username"
          radius="xl"
          size="sm"
        />
        <NoteCardHeading
          :author="props.note.author"
          :created-at="props.note.createdAt"
          :read-only="props.readOnly"
        />
      </div>

      <NoteCardBody
        :body="props.note.body"
        :class="props.readOnly && 'text-sm'"
      />
      <NoteCardMedia v-if="!props.readOnly" :media="props.note.media!" />
      <NoteCardEngagements
        v-if="!props.hideEngagements"
        :note="props.note"
        :like-count="props.note.likeCount"
        :reply-count="props.note.replyCount"
        :detailed-view="detailedView"
        :is-thread="isThread"
        :read-only="props.readOnly"
      />
    </div>
  </div>
</template>
