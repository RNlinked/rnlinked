<script setup lang="ts">
import type { NavItemProps } from "~/components/app/nav/types";

const { user } = useAuth();
const { username } = user.value!;

const settingsItems: NavItemProps[] = [
  {
    label: "Account Settings",
    route: `/${username}/settings`,
  },
  {
    label: "Professional Profile",
    route: `/${username}/settings/professional`,
  },

  {
    label: "Privacy & Security",
    route: `/${username}/settings/security`,
  },
  {
    label: "Notifications",
    route: `/${username}/settings/notifications`,
  },
  {
    label: "Content Preferences",
    route: `/${username}/settings/community`,
  },
];
</script>

<template>
  <AppContainer inner-width="full" show-back-btn>
    <div class="h-[calc(100dvh-7rem)] flex gap-2 w-full overflow-hidden">
      <section
        class="flex flex-col gap-2 basis-1/5 shrink px-1 py-6 stick top-10 h-screen"
      >
        <AppNavItem
          v-for="item in settingsItems"
          :key="item.label"
          :label="item.label"
          :route="item.route"
          class="lg:text-lg text-base"
        />
      </section>

      <section class="flex-1 shrink-0 mx-auto max-w-xl overflow-scroll">
        <slot />
      </section>
    </div>
  </AppContainer>
</template>
