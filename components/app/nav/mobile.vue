<script setup lang="ts">
import { authClient } from "~/lib/auth-client";
import type { NavItemProps } from "./types";

const { data } = await authClient.getSession();
const user = data?.user;

const navItems: NavItemProps[] = [
  {
    label: "Home",
    icon: "solar:home-smile-angle-bold",
    route: "/",
  },
  {
    label: "Articles",
    icon: "solar:document-text-bold",
    route: "/articles",
  },
  {
    label: "Explore",
    icon: "solar:rounded-magnifer-linear",
    route: "/explore",
    disabled: true,
  },
  ...(user
    ? [
        {
          label: "Profile",
          icon: "solar:user-bold",
          route: `/${user.username}`,
        },
      ]
    : [{ label: "Profile", icon: "solar:user-bold", route: "sign-in" }]),
];
</script>
<template>
  <div
    class="fixed inset-x-0 bottom-0 z-50 flex-ctr-ard border-t h-[4rem] sm:hidden"
  >
    <AppNavItem
      v-for="item in navItems"
      :icon="item.icon"
      :disabled="item.disabled"
      :route="item.route"
    />
  </div>
</template>
