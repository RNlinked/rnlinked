<script setup lang="ts">
const faqs: Array<{ id: number; question: string; answer: string }> = [
  {
    id: 1,
    question: "Who can join RNlinked?",
    answer:
      "RNlinked is built for registered nurses, nursing students, and healthcare professionals who are looking to connect, grow, and thrive in a supportive community. Whether you're just beginning your journey or have years of experience, RNlinked offers a space to share knowledge, find new opportunities, and engage with others who truly understand the realities of healthcare.",
  },
  {
    id: 2,
    question: "Does RNlinked offer mentorship?",
    answer:
      "Yes, RNlinked offers mentorship programs that connect nurses with seasoned professionals for guidance and support.",
  },
  {
    id: 4,
    question: "Is there a membership fee?",
    answer:
      "No, RNlinked is free to join for all registered nurses and nursing students.",
  },
  {
    id: 5,
    question: "What resources are available?",
    answer:
      "RNlinked provides a variety of resources including articles, webinars, and networking opportunities.",
  },
  {
    id: 6,
    question: "Can I contribute content?",
    answer: "Absolutely! We welcome contributions from our community members.",
  },
  {
    id: 9,
    question: "What specialities are represented on RNlinked?",
    answer:
      "RNlinked hosts a diverse range of specialities including critical care, pediatrics, geriatrics, oncology, and more. You can find groups and discussions tailored to your specific interests and expertise.",
  },

  {
    id: 11,
    question: "Is there a mobile app for RNlinked?",
    answer:
      "Yes, RNlinked has a mobile app available for both iOS and Android devices.",
  },
  {
    id: 10,
    question: "How do I report inappropriate content?",
    answer:
      "If you encounter any inappropriate content, please use the reporting feature available on each post or contact our support team directly.",
  },
  {
    id: 8,
    question: "What differentiates RNlinked from other platforms?",
    answer:
      "RNlinked is specifically designed for nurses, offering tailored resources, community support, and networking opportunities that are not available on general platforms.",
  },
];
</script>
<template>
  <section id="about" class="bg-celery-100 dark:bg-celery-950 py-14">
    <div class="flex justify-between max-w-7xl xl:mx-auto mx-5 gap-10">
      <div class="flex-1 basis-6/12">
        <p
          class="text-lg rounded-full border-2 border-tradewind-600 text-tradewind-700 inline-block px-4 py-2"
        >
          Answer to Questions
        </p>
        <h2 class="text-4xl font-bold py-8 tracking-wide">
          Frequently Asked Questions
        </h2>
        <p class="text-xl max-w-2xl mb-10 py-4">
          Here are some common questions about the RNlinked community. If you
          have more, feel free to reach out to us!
        </p>
      </div>
      <Accordion type="single" collapsible class="w-full space-y-4">
        <AccordionItem
          v-for="faq in faqs"
          :key="faq.id"
          :value="faq.id.toString()"
          class="border-1 border-tradewind-500 px-5 rounded-lg"
        >
          <AccordionTrigger class="text-xl font-semibold underline-offset-5">
            {{ faq.question }}
          </AccordionTrigger>
          <AccordionContent>
            <p class="text-lg">{{ faq.answer }}</p>
          </AccordionContent>
        </AccordionItem>
        <br />
      </Accordion>
    </div>
  </section>
  <section
    class="bg-linear-to-r from-tradewind-600 to-tradewind-900 text-center py-20 -mt-10"
  >
    <h3 class="text-5xl font-semibold text-white pb-8">
      Ready to join our nursing community?
    </h3>
    <p class="text-white max-w-2xl mx-auto mb-10 text-lg">
      Sign up today to connect with nurses from around the world, share
      knowledge, find support and grow your career with RNlinked.
    </p>
    <AuthButton
      auth-type="sign-up"
      label="Get Started for Free"
      class="hidden sm:inline bg-white hover:bg-celery-300 text-tradewind-700 text-nowrap text-lg font-medium px-10 py-4 rounded-full"
    />
  </section>
</template>
