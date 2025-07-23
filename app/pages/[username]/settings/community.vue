<script setup lang="ts">
definePageMeta({
  layout: "settings",
});
</script>

<template>
  <h1 class="text-lg font-bold pt-5">Content Preferences</h1>
  <p class="text-muted-foreground mb-8 text-sm">
    Manage your content preferences, including topics of interest and content
    visibility.
  </p>
  <section class="space-y-5 mb-8 border rounded-lg p-4">
    <div class="cursor-pointer">
      <h3 class="font-medium">Professional interest</h3>
      <p class="text-muted-foreground text-xs">
        Select the topics that interest you to personalize your content feed.
      </p>
    </div>
    <hr />
    <div class="flex-ctr-btw gap-2">
      <p>Prioritize content from</p>
      <SharedSelect
        :items="[
          { value: 'connections', label: 'Connections' },
          {
            value: 'following',
            label: 'People I follow',
          },
          { value: 'specialty', label: 'Nurses in similar specialties' },
          { value: 'everyone', label: 'Everyone' },
        ]"
        default-value="connections"
      />
    </div>
  </section>
</template>
