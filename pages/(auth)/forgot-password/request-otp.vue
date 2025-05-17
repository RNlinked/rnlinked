<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});
</script>
<template>
  <div class="space-y-3">
    <h1 class="text-center font-semibold text-lg">Forgot password?</h1>
    <p class="text-accent-foreground text-sm text-center">
      No worries, enter the email address with your account and we&apos;ll send
      you a code to reset your password
    </p>
  </div>
  <form @submit.prevent class="w-full space-y-3">
    <Input
      type="email"
      name="email"
      placeholder="Email"
      icon="solar:letter-line-duotone"
    />

    <Button
      type="submit"
      class="rounded-full px-8 font-medium text-white ring-1 text-lg md:tracking-wide w-full"
      label="Send code"
      @click="
        $router.push({
          name: 'forgot-password',
        })
      "
    />

    <p class="text-center text-sm py-5">
      Remembered your password?&nbsp;
      <Button
        type="button"
        variant="link"
        class="-m-2.5 text-tradewind-500 font-bold"
        label="Sign in"
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
