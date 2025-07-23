<script setup lang="ts">
const featureList = [
  {
    icon: "solar:users-group-rounded-outline",
    color: "bg-tradewind-600",
    ringColor: "hover:ring-tradewind-600",
    title: "Find your Tribe",
    description:
      "Connect with nurses who share your specialty, interests, and challenges. Build meaningful professional relationships that last.",
  },
  {
    icon: "solar:share-circle-outline",
    color: "bg-celery-500",
    ringColor: "hover:ring-celery-500",
    title: "Share Knowledge",
    description:
      "Exchange insights, best practices, and experiences. Learn from seasoned professionals and mentor newcomers to the field.",
  },
  {
    icon: "solar:heart-angle-line-duotone",
    color: "bg-contessa-600",
    ringColor: "hover:ring-contessa-600",
    title: "Find Support",
    description:
      "Get encouragement and advice when you need it most. Access a supportive community that understands the unique challenges of nursing.",
  },
  {
    icon: "solar:upload-linear",
    color: "bg-radial from-celery-400 to-tradewind-500 ",
    ringColor: "hover:ring-celery-400",
    title: "Grow Your Career",
    description:
      "Discover job opportunities, continuing education resources and career advancement tips from your professional network.",
  },
];
</script>
<template>
  <section id="features" class="bg-celery-100 dark:bg-celery-950 py-10">
    <h2 class="text-4xl font-bold py-8 text-center tracking-wide">
      Everything you need to thrive as a nurse
    </h2>
    <p class="text-xl text-center max-w-2xl mx-auto mb-10 py-4">
      RNlinked provides you with the tools and community support to help you
      succeed in your nursing career.
    </p>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-5 mb-16 max-w-7xl mx-auto"
    >
      <li
        v-for="feature in featureList"
        :key="feature.title"
        :class="`bg-accent px-6 py-8 ${feature.ringColor} ring ring-neutral-200 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 `"
      >
        <span
          :class="`p-3 ${feature.color} text-white rounded-lg inline-flex mb-4`"
        >
          <Icon :name="feature.icon" size="26" />
        </span>
        <h3 class="text-lg font-semibold py-2">{{ feature.title }}</h3>
        <p class="text-sm text-accent-foreground">{{ feature.description }}</p>
      </li>
    </ul>
  </section>
</template>
