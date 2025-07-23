<script setup lang="ts">
definePageMeta({
  layout: "settings",
});

const notificationsOptions = {
  frequency: [
    { value: "instant", label: "Instant" },
    { value: "daily", label: "Daily Digest" },
    { value: "weekly", label: "Weekly Digest" },
    { value: "none", label: "No Notifications" },
  ],
  notificationItems: [
    {
      itemGroupName: "Engagement",
      items: [
        { value: "likes", label: "Likes on my post" },
        { value: "replies", label: "Replies to my post" },
        { value: "shares", label: "Shares of my post" },
        { value: "mentions", label: "Mentions" },
        { value: "message", label: "New message" },
        {
          value: "community-activity",
          label: "Community/group activity",
          description: "Activity in communities or groups I follow",
        },
      ],
    },
    {
      itemGroupName: "Connections",
      items: [
        { value: "follower", label: "New follower" },
        { value: "new-connection", label: "New connection request" },
        { value: "connection-accepted", label: "Connection request accepted" },
      ],
    },
    {
      itemGroupName: "Content",
      items: [
        { value: "new-content", label: "New content from followed accounts" },
        {
          value: "new-content-from-connections",
          label: "New content from connections",
        },
        { value: "new-topic-content", label: "New content in followed topics" },
        { value: "content-recommendations", label: "Content recommendations" },
      ],
    },

    {
      itemGroupName: "Learning",
      items: [
        { value: "course-recommendations", label: "Course recommendations" },
        { value: "course-updates", label: "Course updates" },
        { value: "learning-paths", label: "Learning paths" },
      ],
    },
    {
      itemGroupName: "Career Opportunities",
      items: [
        { value: "job-alerts", label: "Job alerts" },
        { value: "event-invitation", label: "Event invitation" },
        { value: "event-updates", label: "Event updates" },
        { value: "event-reminders", label: "Event reminders" },
        { value: "career-opportunities", label: "Career opportunities" },
        { value: "career-advise", label: "Career advice" },
      ],
    },
    {
      itemGroupName: "News and Updates from RNlinked",
      items: [
        { value: "newsletter", label: "Newsletter subscriptions" },
        { value: "feature-announcements", label: "Feature announcements" },
        { value: "privacy-policy-updates", label: "Privacy policy updates" },
        {
          value: "terms-of-service-updates",
          label: "Terms of service updates",
        },
        { value: "product-updates", label: "Product updates" },
        { value: "platform-changes", label: "Platform changes" },
      ],
    },
  ],
  mode: [
    { value: "push", label: "In-app" },
    { value: "email", label: "Email" },
  ],
};
</script>

<template>
  <h1 class="text-lg font-bold pt-5">Notification Settings</h1>
  <p class="text-muted-foreground mb-8 text-sm">
    Controls for visibility, messaging, and personal data.
  </p>

  <section class="space-y- my-8 rounded-2xl p- order">
    <div class="cursor-pointer flex justify-between gap-3 py-8">
      <span class="basis-2/3 block">
        <p>Notification frequency</p>
        <p class="text-muted-foreground text-xs">
          Choose how often you want to receive notifications about activity on
          your account.
        </p>
      </span>
      <SharedSelect
        class="basis-1/3 flex-1"
        :items="notificationsOptions.frequency"
        default-value="instant"
      />
    </div>
    <hr />
    <Accordion type="single" class="w-full" collapsible>
      <AccordionItem
        v-for="group in notificationsOptions.notificationItems"
        :key="group.itemGroupName"
        :value="group.itemGroupName"
      >
        <AccordionTrigger>{{ group.itemGroupName }}</AccordionTrigger>
        <AccordionContent>
          <div
            v-for="item in group.items"
            :key="item.value"
            class="flex-ctr-btw gap-2 borde last:border-0 py-2 px-4"
          >
            <div class="flex-1">
              <p>{{ item.label }}</p>
              <p class="text-muted-foreground text-xs">
                {{ item.description }}
              </p>
            </div>
            <span class="flex items-center gap-3">
              <Label
                v-for="mode in notificationsOptions.mode"
                :key="mode.value"
                class="p-3"
              >
                <Checkbox id="engagement" />
                <span class="text-xs">{{ mode.label }}</span>
              </Label>
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
