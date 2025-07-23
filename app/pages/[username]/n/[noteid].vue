<script setup lang="ts">
import { api } from "~/lib/constants";
import type { Note } from "~/lib/types";

definePageMeta({
  layout: "app-layout",
});

const { username, noteid } = useRoute().params as {
  username: string;
  noteid: string;
};
const { data } = await useFetch<{
  note: Note;
  success: boolean;
  parents: Note[];
}>(`${api}/notes/${noteid}`, {
  key: `note-${username}-${noteid}`,
});
const { note, parents, success } = data.value || {};
</script>

<template>
  <AppContainer show-back-btn>
    <AppAlertCard
      v-if="!success || !note"
      title="Note not found"
      message="The note you are looking for does not exist or has been deleted."
    />
    <div v-else>
      <NoteCard v-for="parent in parents" :note="parent" is-thread />
      <NoteCard :note="note" detailed-view />
      <div v-if="note.replies.length" class="mt-4">
        <h3 class="text-lg font-medium mb-3">
          {{ note?.replies?.length }} Repl{{
            note?.replies.length === 1 ? "y" : "ies"
          }}
        </h3>

        <NoteCard v-for="reply in note.replies" :key="reply.id" :note="reply" />
      </div>
      <div v-else class="mt-4 text-center py-8 sm:-ml-24">
        <h3>No replies yet!</h3>
        <p class="text-muted-foreground">
          No replies yet. Be the first to reply!
        </p>
      </div>
    </div>
  </AppContainer>
</template>
