<script setup lang="ts">
import type { NavItemProps } from "./nav/types";

const { user, signOut } = useAuth();
// const user = auth.user;
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
  {
    label: "Notifications",
    icon: "solar:bell-bold",
    route: "/notifications",
    disabled: true,
  },
  ...(user
    ? [
        {
          label: "Profile",
          icon: "solar:user-bold",
          route: `/${user.value?.username}`,
        },
      ]
    : []),
];
</script>
<template>
  <Sidebar>
    <SidebarHeader class="p-5">
      <Logo />
    </SidebarHeader>
    <SidebarContent class="py-8 px-4">
      <SidebarMenu v-for="item in navItems" :key="item.label">
        <AppNavItem
          :label="item.label"
          :icon="item.icon"
          :route="item.route"
          :disabled="item.disabled"
          :disabledMessage="item.disabledMessage"
        />
      </SidebarMenu>
      <SidebarMenu>
        <DropdownMenu
          ><DropdownMenuTrigger class="flex">
            <AppNavItem label="More" icon="solar:menu-dots-square-broken" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuItem><AppThemeSwitcher /> </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuItem>
              <AppNavItem
                label="Log out"
                icon="solar:logout-2-bold-duotone"
                @click="signOut({ redirectTo: '/welcome' })"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
</template>
