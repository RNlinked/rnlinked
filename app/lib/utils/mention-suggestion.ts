import { VueRenderer } from "@tiptap/vue-3";
import tippy, { followCursor, inlinePositioning } from "tippy.js";
import { api } from "../constants";
import { MentionList } from "~/components/app/create/note/mention";
import { PluginKey } from "@tiptap/pm/state";

interface MentionResponse {
  success: boolean;
  mentions: { name: string; username: string }[];
}

const getMentions = async (query: string) => {
  try {
    const data = await $fetch<MentionResponse>(
      `${api}/users/mentions?q=${query}`
    );
    if (data && data.success) {
      return data.mentions;
    }
    console.error("Failed to fetch mentions:", data);
    return [];
  } catch (error) {
    console.error("Error fetching mentions:", error);
    return [];
  }
};

const getHashtags = async (query: string) => {
  try {
    const data = await $fetch<{ success: boolean; topics: { name: string }[] }>(
      `${api}/topics?q=${query}`
    );
    if (data && data.success) {
      return data.topics;
    }
    console.error("Failed to fetch hashtags:", data);
    return [];
  } catch (error) {
    console.error("Error fetching hashtags:", error);
    return [];
  }
};

const suggestion = (char: "@" | "#") => {
  return {
    char,
    pluginKey: new PluginKey(`mention-${char}`),

    items: async ({ query }: { query: string }) => {
      if (char === "@") {
        // Fetch mentions
        const data = await getMentions(query);

        return data
          .map((item) => {
            return {
              id: item.username,
              label: item.name,
            };
          })
          .slice(0, 5);
      } else if (char === "#") {
        // Fetch hashtags
        const topics = await getHashtags(query);

        if (topics.length === 0) {
          return [
            {
              id: `add-topic-${query}`,
              label: query,
              x: "Add topic",
            },
          ];
        }

        return topics.map((topic) => ({
          id: topic.name,
          label: topic.name,
        }));
      } else {
        console.error("Invalid character for suggestion:", char);
        return [];
      }
    },

    render: () => {
      let component: any;
      let popup: any;

      return {
        onStart: (props: any) => {
          component = new VueRenderer(MentionList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          const referenceEl = document.getElementById("insert-mention");
          if (!referenceEl) return;

          [popup] = tippy("#insert-mention", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => referenceEl,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
            followCursor: "initial",
            inlinePositioning: true,
            plugins: [followCursor, inlinePositioning],
          });
        },

        onUpdate(props: Record<string, any> | undefined) {
          component.updateProps(props);

          if (!props || !props.clientRect) {
            popup?.hide();
            return;
          }

          popup.setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onExit() {
          popup?.destroy();
          component.destroy();
        },
      };
    },
  };
};

export default suggestion;
