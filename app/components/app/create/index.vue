<script setup lang="ts">
const { openNewNote } = useNoteStore();
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex">
      <Button
        label="Create"
        icon="solar:alt-arrow-down-line-duotone"
        class="flex-row-reverse"
        size="md"
        icon-size="22"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="pb-3 space-y-2">
      <DropdownMenuItem @click="openNewNote">
        <Icon name="solar:pen-new-square-outline" size="20" />
        Note
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Icon name="solar:document-add-linear" size="20" />
        Article
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
