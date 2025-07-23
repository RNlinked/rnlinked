import { ref } from "vue";
import { defineStore } from "pinia";
import type { NewNotePayload, Note } from "~/lib/types";
import { toast } from "vue-sonner";

export const useNoteStore = defineStore("noteModal", () => {
  const api = useRuntimeConfig().public.apiUrl;
  const { user } = useAuth();
  const { getSignedUrl } = useUploader();

  // Modal open state
  const open = ref(false);
  const openMention = ref(false);
  const loading = ref(false);
  const content = ref("");
  const files = ref<File[]>([]);
  const previewUrls = ref<string[]>([]);

  // Reply mode
  const isReply = ref(false);

  // Parent note (if replying)
  const parentNote = ref<Note | null>(null);

  // Toggle modal visibility
  const toggleModal = (value?: boolean) => {
    open.value = typeof value === "boolean" ? value : !open.value;
  };

  // Open modal for a reply
  const openReply = (note: Note) => {
    parentNote.value = note;
    isReply.value = true;
    open.value = true;
  };

  // Open modal for a new note
  const openNewNote = () => {
    parentNote.value = null;
    isReply.value = false;
    open.value = true;
  };

  // Close modal
  const closeModal = () => {
    open.value = false;
    parentNote.value = null;
    isReply.value = false;
  };

  const uploadFiles = async () => {
    if (files.value.length === 0) return;

    const uploadedFiles = await Promise.all(
      files.value.map(async (file) => {
        const data = await getSignedUrl({
          file,
          userId: user.value!.id,
        });

        if (!data.success) {
          toast.error(data.message || "Failed to upload file");
        }

        return { url: data.url, file: data.file };
      })
    );

    return uploadedFiles;
  };

  // CRUD-like note actions (placeholders)
  const createNote = async () => {
    loading.value = true;

    if (!user.value) {
      console.error("User not authenticated");
      loading.value = false;
      return;
    }

    const payload: NewNotePayload = {
      body: content.value,
      authorId: user.value?.id,
    };

    if (isReply.value && parentNote.value) {
      payload.parentId = parentNote.value.id;
    }

    let uploadedFiles: {
      urls?: string;
      file?: File;
    }[] = [];

    // get signed URLs for files
    if (files.value.length > 0) {
      const filesData = await uploadFiles();
      if (!filesData) return toast.error("Failed to upload files");

      uploadedFiles = filesData;
      // get the urls from the filesData
      const signedUrls = filesData
        .map((file) => {
          if (file.file) {
            return {
              url: file.url!.split("?")[0],
              type: file.file.type.startsWith("image") ? "image" : "video",
            };
          }
        })
        .filter(Boolean);

      payload.media = signedUrls.filter(
        (file): file is { url: string; type: "image" | "video" } =>
          file !== undefined && typeof file.url === "string"
      );
    }

    const response = await $fetch(`${api}/notes`, {
      method: "POST",
      body: payload,
    });

    console.log("Note created:", response);

    loading.value = false;
  };

  const editNote = async (noteId: string, updateData: any) => {
    // TODO: Implement note editing logic
  };

  const deleteNote = async (noteId: string) => {
    // TODO: Implement note deletion logic
  };

  const likeNote = async (noteId: string) => {
    // TODO: Implement like toggling logic
  };

  return {
    open,
    isReply,
    parentNote,
    openMention,
    loading,
    content,
    files,
    previewUrls,
    toggleModal,
    openReply,
    openNewNote,
    closeModal,
    createNote,
    editNote,
    deleteNote,
    likeNote,
  };
});
