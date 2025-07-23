<template>
  <div class="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
    <AppNavBar showNavigateBackBtn page-title=" " right />

    <!-- <ul class="hidden md:flex items-center justify-end gap-3 md:gap-6">
        <AuthButton
          authType="sign-in"
          class="rounded-full bg-celery-100/50 dark:bg-celery-500/40 p-1 px-4 font-medium ring-1 ring-slate-300 dark:ring-slate-500 md:text-xl md:font-normal md:tracking-wide"
        />
        <AuthButton
          label="Join"
          authType="sign-up"
          class="bg-teal-500 ring-tradewind-600 rounded-full p-0.5 px-5 font-medium text-white ring-1 md:px-7 md:text-xl md:tracking-wide"
        />
      </ul> -->

    <main class="flex flex-col items-center justify-around">
      <div
        class="max-w-xl mx-auto w-full sm:border sm:shadow-sm sm:rounded-xl sm:px-0 py-5"
      >
        <div
          class="flx-col-ctr justify-center w-full gap-10 py-8 px-5 sm:px-10"
        >
          <Logo :show-text="false" />
          <slot />
          <div class="w-full hidden sm:block px-10">
            <AuthDisclaimer />
          </div>
        </div>
      </div>
    </main>
    <footer class="h-20 sm:h-32">
      <span class="sm:hidden">
        <AuthDisclaimer />
      </span>
    </footer>
  </div>
</template>
