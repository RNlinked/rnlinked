<script setup lang="ts">
const { isMobile } = useIsMobile();
const { user } = useAuth();
import { EditorContent } from "@tiptap/vue-3";

const noteStore = useNoteStore();
const { editor } = useNoteEditor();
</script>

<template>
  <Dialog v-model:open="noteStore.open">
    <DialogContent placement="top" :size="isMobile ? 'full' : 'xl'">
      <NoteCard
        v-if="noteStore.parentNote"
        :note="noteStore.parentNote"
        is-thread
        read-only
        class="-ml-3"
      />

      <section class="flex items-start gap-3 w-full -mt-1">
        <AppUserAvatar :username="user?.username" size="xs" radius="2xl" />

        <ScrollArea
          class="flex-1 min-h-44 max-h-72 overflow-y-scroll overflow-x-hidden"
          id="insert-mention"
        >
          <EditorContent :editor="editor" class="tiptap break-all min-h-44" />
          <AppCreateNoteMediaPreview />
        </ScrollArea>
      </section>
      <DialogFooter class="flex-ctr-btw w-full gap-2">
        <span class="flex-1">
          <AppCreateNoteFileUploader />
        </span>
        <Button
          variant="outline"
          size="sm"
          class=""
          icon="solar:pen-new-square-outline"
          icon-size="20"
          label="Post"
          @click="noteStore.createNote"
          :loading="noteStore.loading"
        />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
