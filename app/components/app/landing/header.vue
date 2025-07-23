<template>
  <header class="hidden w-full sm:flex sm:justify-between p-4 sm:border-b">
    <Logo class="md:text-3xl" />
    <nav class="hidden sm:flex items-center space-x-8">
      <NuxtLink
        to="/welcome#features"
        class="hover:underline hover:text-tradewind-700 text-lg"
        >Features</NuxtLink
      >
      <NuxtLink
        to="/welcome#community"
        class="hover:underline hover:text-tradewind-700 text-lg"
        >Community</NuxtLink
      >
      <NuxtLink
        to="/welcome#about"
        class="hover:underline hover:text-tradewind-700 text-lg"
        >About</NuxtLink
      >
    </nav>
    <nav class="hidden sm:flex items-center space-x-8">
      <AuthButton
        authType="sign-in"
        class="hover:underline hover:text-tradewind-700 text-lg"
      />
      <AuthButton
        authType="sign-up"
        label="Get Started"
        class="text-white text-lg hover:bg-teal-800 tracking-tight font-medium rounded-full px-6 py-2 bg-teal-700"
      />
    </nav>
  </header>
</template>
