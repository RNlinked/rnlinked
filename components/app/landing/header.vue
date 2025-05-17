<template>
  <header class="hidden w-full sm:flex sm:justify-between p-4 sm:border-b">
    <Logo class="md:text-3xl" />
    <ul class="hidden sm:flex items-center space-x-8">
      <AuthButton authType="sign-in" class="hover:underline" />
      <AuthButton
        authType="sign-up"
        label="Get Started"
        class="text-white hover:bg-teal-600 tracking-tight font-semibold rounded-full px-6 py-2 bg-teal-700"
      />
    </ul>
  </header>
</template>
