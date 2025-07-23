<script setup lang="ts">
const currentYear = new Date().getFullYear();
const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/rnlinked",
    icon: "lineicons:instagram-original",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/rnlinked",
    icon: "lineicons:linkedin-original",
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com/rnlinked",
    icon: "lineicons:x",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/rnlinked",
    icon: "lineicons:facebook-line",
  },
];
</script>

<template>
  <footer class="hidden sm:block px-5 py-20 bg-black text-white">
    <section class="flex gap-16 max-w-7xl mx-auto">
      <div>
        <Logo show-text class="md:text-3xl font-bold" />
        <p class="text-l max-w-md text-neutral-300 mt-8">
          The professional network for nurses worldwide. Connect, share
          knowledge, and grow your career with fellow healthcare professionals
        </p>

        <p class="max-w-2xl text-tradewind-600 font-medium mt-8 mb-4">
          Follow us on our social media pages
        </p>
        <span class="space-x-4">
          <NuxtLink
            v-for="link in socialLinks"
            :key="link.name"
            :to="link.url"
            target="_blank"
            class="text-tradewind-600"
          >
            <Icon :name="link.icon" size="22" />
          </NuxtLink>
        </span>
      </div>

      <div>
        <h3 class="font-semibold text-2xl">Products</h3>
        <div class="flex flex-col gap-3 mt-4">
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Community
          </NuxtLink>
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Mentorship
          </NuxtLink>
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Resources
          </NuxtLink>
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Events
          </NuxtLink>
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Job Board
          </NuxtLink>
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Mobile App
          </NuxtLink>
        </div>
      </div>

      <div>
        <h3 class="font-semibold text-2xl">Company</h3>
        <div class="flex flex-col gap-3 mt-4">
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            About Us
          </NuxtLink>
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Team
          </NuxtLink>
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Careers
          </NuxtLink>
          <NuxtLink to="" class="hover:underline hover:underline-offset-4">
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
    <hr class="border-tradewind-600 my-16" />

    <div class="flex justify-between max-w-7xl mx-auto">
      <p>Ⓒ {{ currentYear }} RNLinked. All rights reserved.</p>
      <span class="space-x-4">
        <NuxtLink
          to="/policy/privacy"
          class="hover:underline hover:underline-offset-4"
        >
          Privacy Policy
        </NuxtLink>
        <NuxtLink
          to="/policy/terms"
          class="hover:underline hover:underline-offset-4"
        >
          Terms of Service
        </NuxtLink>
        <NuxtLink
          to="/policy/cookie"
          class="hover:underline hover:underline-offset-4"
        >
          Cookie Policy
        </NuxtLink>
      </span>
    </div>
  </footer>
</template>
