<script setup lang="ts">
definePageMeta({
  layout: "settings",
});

const profileVisibilityOptions = {
  all: [
    { value: "everyone", label: "Everyone" },
    {
      value: "my-connections-followers",
      label: "My Connections and Followers",
    },
    { value: "my-connections", label: "My Connections" },
    { value: "only-me", label: "Only Me" },
  ],
  everyone: [
    { value: "everyone", label: "Everyone" },

    { value: "only-me", label: "Only Me" },
  ],
};
</script>
<template>
  <h1 class="text-lg font-bold pt-5">Privacy and Security</h1>
  <p class="text-muted-foreground mb-8 text-sm">
    Controls for visibility, messaging, and personal data.
  </p>

  <h2 class="text-lg font-semibold my-2">Profile Visibility</h2>
  <section class="space-y-5 mb-8 border rounded-lg p-4">
    <div class="flex justify-between gap-5">
      <div>
        <h3 class="font-medium">Private Account</h3>
        <p class="text-muted-foreground text-xs">
          When enabled, only accounts you approve can follow you and only your
          connections and followers can see your posts and activity.
        </p>
      </div>
      <Switch />
    </div>
    <hr />
    <div class="flex-ctr-btw gap-2">
      <p>Who can see my posts and activity?</p>
      <SharedSelect
        :items="profileVisibilityOptions.all"
        default-value="everyone"
      />
    </div>
    <hr />
    <div class="flex-ctr-btw gap-2">
      <p class="">Who can see my professional info?</p>
      <SharedSelect
        :items="profileVisibilityOptions.all"
        default-value="my-connections"
      />
    </div>
    <hr />
    <div class="flex-ctr-btw gap-2">
      <p>Who can see my connections?</p>
      <SharedSelect
        :items="profileVisibilityOptions.all"
        default-value="my-connections"
      />
    </div>
    <hr />
    <div class="flex-ctr-btw gap-2">
      <p>Who can message me?</p>
      <SharedSelect
        :items="profileVisibilityOptions.all"
        default-value="my-connections-followers"
      />
    </div>
  </section>

  <section class="space-y-5 mb-8 border rounded-lg p-4">
    <div class="cursor-pointer">
      <h3 class="font-medium">Blocked accounts</h3>
      <p class="text-muted-foreground text-xs">
        Manage accounts you have blocked. They will not be able to see your
        profile or interact with you.
      </p>
    </div>
    <hr />
    <div class="cursor-pointer">
      <h3 class="font-medium">Muted accounts</h3>
      <p class="text-muted-foreground text-xs">
        Manage accounts you have muted. They will not appear in your feed, but
        you will still be able to see their profile.
      </p>
    </div>
    <hr />
    <div class="cursor-pointer">
      <h3 class="font-medium">Report a problem</h3>
    </div>
  </section>
</template>
