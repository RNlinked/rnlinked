<script setup lang="ts">
const props = defineProps<{
  items: { id: string; label: string }[];
  command: (item: { id: string; label: string }) => void;
}>();

const selectedIndex = ref(0);
const open = computed(() => props.items.length > 0);
const modal = useNoteStore();

// Reset selection when items change
watch(
  () => props.items,
  () => {
    selectedIndex.value = 0;
  }
);

function selectItem(index: number) {
  const item = props.items[index];
  if (item) {
    if (item.id.startsWith("add-topic")) {
      // Handle special case for adding a new topic
      props.command({ id: item.label, label: item.label });
    } else {
      // Normal selection
      props.command({ id: item.id, label: item.label });
    }
  }
}
const upHandler = () => {
  selectedIndex.value =
    (selectedIndex.value + props.items.length - 1) % props.items.length;
};

const downHandler = () => {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length;
};

const enterHandler = () => {
  selectItem(selectedIndex.value);
};

// Key handler function
function onKeyDown({ event }: { event: KeyboardEvent }) {
  if (event.key === "ArrowUp") {
    upHandler();
    return true;
  }

  if (event.key === "ArrowDown") {
    downHandler();
    return true;
  }

  if (event.key === "Enter") {
    enterHandler();
    return true;
  }

  return false;
}
</script>

<template>
  <!-- <Popover v-model:open="modal.openMention" @keydown="onKeyDown">
    <PopoverContent>
      popup here
      {{ props.items.length }}
    </PopoverContent>
  </Popover> -->
  <div class="dropdown-menu">
    <template v-if="items.length">
      <div v-for="(item, index) in items" :key="index" class="w-full">
        <small
          v-if="item.id.startsWith('add-topic')"
          class="text-muted-foreground flex-ctr text-xs"
        >
          <Icon name="ic:outline-add" size="18" class="text-muted-foreground" />
          Add New Topic
        </small>
        <button
          :class="{ 'is-selected': index === selectedIndex }"
          @click="selectItem(index)"
        >
          {{ item.label }}
        </button>
      </div>
    </template>
    <div class="item" v-else>No result</div>
  </div>
</template>
