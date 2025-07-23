import { mergeAttributes, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import suggestions from "~/lib/utils/mention-suggestion";

export const useNoteEditor = () => {
  const noteStore = useNoteStore();

  const limit = 521; // Character limit for the editor

  const editor = useEditor({
    content: noteStore.content,
    onUpdate: ({ editor }) => {
      noteStore.content = editor.getHTML();
    },
    autofocus: true,
    editorProps: {
      attributes: {
        autocomplete: "on",
        autocorrect: "on",
        autocapitalize: "on",
        class: "min-h-full",
      },
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start a note...",
      }),
      CharacterCount.configure({ limit }),
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestions: [suggestions("@"), suggestions("#")],
        renderText({ options, node }) {
          return `${node.attrs?.mentionSuggestionChar}${
            node.attrs.label ?? node.attrs.id
          }`;
        },
      }),
    ],
  });
  onBeforeUnmount(() => {
    editor.value?.destroy();
  });

  const percentage = computed(() => {
    if (!editor.value) return 0;
    const chars = editor.value.storage.characterCount?.characters() ?? 0;
    return Math.round((100 / limit) * chars);
  });

  return {
    editor,
    percentage,
  };
};
