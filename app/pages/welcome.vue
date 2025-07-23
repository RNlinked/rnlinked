<script setup lang="ts">
definePageMeta({
  auth: false,
});
</script>

<template>
  <div class="min-h-[100dvh] bg-celery-50 dark:bg-background">
    <!-- Mobile View -->
    <section
      class="sm:hidden flex items-center flex-col justify-around h-[100dvh] py-5"
    >
      <AppLandingShapeMobile />
      <div class="sm:hidden px-4">
        <AppLandingHeroText />
      </div>
      <div className="sm:hidden space-y-3 mt-8 text-center ">
        <AuthButton
          authType="sign-up"
          label="Create Account"
          class="w-full inline-block bg-teal-700 hover:bg-teal-700/80 text-white text-lg text-nowrap font-medium px-10 py-2.5 rounded-lg mb-2"
        />
        <AuthButton
          authType="sign-in"
          label="Sign In"
          class="w-full inline-block bg-celery-200/70 hover:bg-celery-200/60 ring ring-muted text-nowrap text-lg font-medium px-10 py-2.5 rounded-lg"
        />
      </div>
    </section>
    <!-- End of Mobile View -->

    <!-- Desktop View -->
    <section class="hidden sm:grid sm:grid-rows-[auto_1fr_auto]">
      <AppLandingHeader />
      <main class="hidden sm:block max-w-screen space-y-8">
        <div
          class="px-4 sm:px-10 sm:text-center sm:py-16 space-y-4 sm:space-y-12"
        >
          <AppLandingHeroText />
          <AuthButton
            auth-type="sign-up"
            label="Get Started for Free"
            class="hidden sm:inline bg-tradewind-700 hover:bg-tradewind-800 text-white text-nowrap text-xl font-medium px-10 py-4 rounded-full"
          />
        </div>
        <div class="hidden sm:block space-y-10 pb-10">
          <AppLandingShapeCarousel />
          <AppLandingShapeCarousel reverse-list />
        </div>
        <AppLandingFeature />
        <AppLandingCommunity />
        <AppLandingFAQ />
      </main>
      <AppLandingFooter />
    </section>
    <!-- End of Desktop View -->
  </div>
</template>
