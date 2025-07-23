<script setup lang="ts">
definePageMeta({
  layout: "settings",
});

const { username } = useRoute().params as { username: string };
const { user } = useAuth();

if (!user.value) {
  navigateTo("/404");
}
if (user.value?.username !== username) {
  navigateTo(`/${user.value?.username}/settings`);
}
</script>
<template>
  <h1 class="text-lg font-bold pt-5">Your Account</h1>
  <p class="text-muted-foreground mb-8 text-sm">
    Manage your account settings, including profile information and security
    options.
  </p>
  <AppUserAvatar size="xl" radius="3xl" :username="user?.username" />
  <form @submit.prevent="" class="py-6">
    <Input
      type="text"
      placeholder="Name"
      class="w-full mb-4"
      icon="solar:user-bold-duotone"
      label="Full Name"
    />
    <div class="space-y-0">
      <Input
        type="text"
        placeholder="Username"
        class="w-full mb-4"
        icon="solar:shield-user-line-duotone"
        label="Username"
      />
      <small class="-mt-3 pl-1 mb-3.5 block">rnlinked.com/{{ username }}</small>
    </div>
    <Input
      type="text"
      placeholder="Email address"
      class="w-full mb-4"
      icon="solar:letter-line-duotone"
      label="Email Address"
    />
    <Textarea placeholder="Bio" label="Bio" />
  </form>

  <h2 class="text-lg font-semibold my-2">Account access</h2>
  <section class="space-y-3.5 mb-8 border rounded-lg p-4">
    <div class="cursor-pointer">
      <h3 class="font-medium">Change password</h3>
      <p class="text-muted-foreground text-xs">
        Update your password to keep your account secure.
      </p>
    </div>
    <hr />
    <div class="cursor-pointer">
      <h3 class="font-medium">Two-factor authentication</h3>
      <p class="text-muted-foreground text-xs">
        Add an extra layer of security to your account.
      </p>
    </div>
    <hr />
    <div>
      <h3 class="font-medium cursor-pointer">Login activity</h3>
      <p class="text-muted-foreground text-xs">
        View your recent login activity and devices.
      </p>
    </div>
    <hr />
    <div class="cursor-pointer">
      <h3 class="font-medium">Connected accounts</h3>
      <p class="text-muted-foreground text-xs">
        Manage your connected accounts and services.
      </p>
    </div>
  </section>

  <h2 class="text-lg font-medium my-2">Danger zone</h2>
  <section class="space-y-3.5 mb-4 border rounded-lg p-4">
    <div class="cursor-pointer">
      <h3 class="text-contessa-700 font-medium">Delete all my data</h3>
      <p class="text-muted-foreground text-xs">
        This will delete all your data, including your notes, articles, and
        lists. You will not be able to recover this data.
      </p>
    </div>
    <hr />
    <div class="cursor-pointer">
      <h3 class="text-contessa-700 font-medium">Deactivate account</h3>
      <p class="text-muted-foreground text-xs">
        This will deactivate your account. You can reactivate it at any time by
        logging in again.
      </p>
    </div>
    <hr />
    <div class="cursor-pointer">
      <h3 class="text-contessa-700 font-medium">Delete account</h3>
      <p class="text-muted-foreground text-xs">
        This action is irreversible. All your data will be permanently deleted.
      </p>
    </div>
  </section>
</template>
