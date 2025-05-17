<script setup lang="ts"></script>
<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});
</script>

<template>
  <div class="space-y-3">
    <h1 class="text-center font-semibold text-lg">Reset your password</h1>
    <p class="text-accent-foreground text-sm text-center">
      We have sent a code to
      <strong> {{ $route.query.email || "jx.akpu@rnlinked.com" }} </strong>
    </p>
  </div>
  <form @submit.prevent class="w-full space-y-4">
    OTP
    <AuthPin />

    <Input
      type="password"
      name="password"
      placeholder="New Password"
      value=""
      icon="solar:password-line-duotone"
      label="New Password"
    />
    <Button
      type="submit"
      class="rounded-full px-8 font-medium text-white ring-1 text-lg md:tracking-wide w-full"
      label="Reset password"
      @click="
        $router.push({
          name: 'forgot-password',
        })
      "
    />
    <p class="text-center text-sm py-5">
      Didn&apos;t receive a code?
      <Button
        type="button"
        variant="link"
        class="-m-2.5 text-tradewind-500 font-bold"
        label="Resend code"
        @click="
          $router.push({
            name: 'sign-in',
            query: { flow: 'email', ...$route.query },
          })
        "
      />
    </p>
  </form>
</template>
