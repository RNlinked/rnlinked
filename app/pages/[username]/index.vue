<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";

definePageMeta({
  layout: "app-layout",
});
const { username } = useRoute().params as { username: string };
const { user } = useAuth();

const tabs = ["Profile", "Notes", "Articles", "Lists"];
</script>
<template>
  <AppContainer right-nav-item>
    <template #right-nav-item>
      <NuxtLink
        variant="ghost"
        size="icon"
        icon="solar:settings-broken"
        :class="
          buttonVariants({
            variant: 'ghost',
            size: 'icon',
            class: 'text-muted-foreground',
          })
        "
        :to="`/${username}/settings`"
        :aria-label="`Settings for ${username}`"
      >
        <Icon
          name="solar:settings-broken"
          size="22"
          class="text-muted-foreground"
        />
      </NuxtLink>
    </template>
    <AppAlertCard v-if="!user" title="User Not Found" />

    <section v-else>
      <div class="mx-3 my-4 flex w-full items-start justify-center gap-5">
        <AppUserAvatar
          :src="user.image"
          :username="user.username"
          size="2xl"
          radius="3xl"
        />

        <div class="flex-btw w-full flex-1 flex-col sm:flex-row">
          <div class="leading-3 sm:py-4 space-y-1">
            <p class="text-xl font-medium md:text-2xl">{{ user.name }}</p>
            <p class="text-muted-foreground">@{{ user.username }}</p>
          </div>
        </div>
      </div>

      <p class="px-3">
        {{ user.bio }}
      </p>

      <div class="flex items-center gap-4 px-3 my-3">
        <NuxtLink to="#" class="text-muted-foreground text-sm hover:underline"
          >{{ 680 }} Connections</NuxtLink
        >
        <NuxtLink to="#" class="text-muted-foreground text-sm hover:underline"
          >{{ 260 }} Followers</NuxtLink
        >
      </div>

      <div class="flex items-center gap-2 px-3 w-full">
        <NuxtLink
          v-if="user.username === username"
          size="lg"
          :class="
            buttonVariants({
              variant: 'default',
              class: 'flex-1',
            })
          "
          :to="`/${user.username}/settings`"
        >
          Edit Profile
        </NuxtLink>
        <Button label="Connect" class="flex-1" />
        <!-- <Button label="Message" class="flex-1" /> -->
        <Button
          label="Follow"
          variant="secondary"
          icon="solar:plus-bold-duotone"
          class="flex-1"
        />
        <Button size="icon" variant="outline" icon="solar:menu-dots-bold" />
      </div>

      <Tabs class="w-full my-4" default-value="Profile">
        <TabsList class="w-full">
          <TabsTrigger v-for="(tab, index) in tabs" :value="tab">{{
            tab
          }}</TabsTrigger>
        </TabsList>
        <TabsContent
          v-for="(tab, index) in tabs"
          :key="index"
          :value="tab"
          class="p-4"
        >
          <p class="text-muted-foreground">
            {{ user.username }}'s {{ tab }} content goes here.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  </AppContainer>
</template>
