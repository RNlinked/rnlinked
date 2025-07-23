<script setup lang="ts">
import type { Note } from "~/lib/types";
import { cn } from "~/lib/utils";
const sampleNotes: Note[] = [
  {
    id: "note-001",
    body: "Just wrapped up a long day supporting clinicians through digital tools and workflows. Grateful for the teams who embrace innovation with heart. Remember you're not just a nurse , you're shaping the future of healthcare! #NurseLife #InnovationInCare",
    authorId: "001",
    likeCount: 247,
    replyCount: 18,
    createdAt: "2023-10-01T12:00:00Z",
    author: {
      id: "001",
      name: "Timothy Adesina, RN",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "timothyadesina",
      email: "",
      emailVerified: false,
      createdAt: new Date("2023-10-01T12:00:00Z"),
      role: "",
    },
  },
  {
    id: "note-002",
    body: "Celebrating 5 years as a pediatric nurse today!  From scared new grad to confident caregiver - this community has been with me every step of the way. Thank you for all the support! #NurseJourney #PediatricNurse",
    authorId: "002",
    likeCount: 156,
    replyCount: 31,
    createdAt: "2023-10-02T12:00:00Z",
    author: {
      id: "002",
      name: "Lisa Rodriguez, RN",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      username: "janedoe",
      email: "",
      emailVerified: false,
      createdAt: new Date("2023-10-02T12:00:00Z"),
      role: "",
    },
  },
];
</script>
<template>
  <section
    id="community"
    class="flex justify-between pt-16 pb-20 max-w-7xl xl:mx-auto mx-5"
  >
    <div class="flex- basis-6/12 max-w-2xl p-6 space-y-6">
      <h2 class="text-4xl font-semibold leading-14">
        Experience the future of nursing community
      </h2>
      <p class="text-lg mb-6 leading-7">
        Our intuitive platform makes it easy to connect, share, and grow with
        nurses from around the globe. Built by nurses, for nurses.
      </p>
      <ul class="my-8 space-y-6 text-lg">
        <li>
          <div
            class="w-3 h-3 bg-tradewind-600 rounded-full inline-block mr-2"
          />
          Real-time messaging and discussions
        </li>
        <li>
          <div class="w-3 h-3 bg-celery-300 rounded-full inline-block mr-2" />
          Specialty-focused groups and forums
        </li>
        <li>
          <div class="w-3 h-3 bg-contessa-600 rounded-full inline-block mr-2" />
          Career resources and job postings
        </li>
        <li>
          <div class="w-3 h-3 bg-celery-600 rounded-full inline-block mr-2" />
          Continuing education opportunities
        </li>
      </ul>
    </div>

    <div class="bg-accent px-4 shadow-lg rounded-2xl flex-1 max-w-lg">
      <header
        class="flex items-center justify-between mb-4 -mx-4 border-b py-4 rounded-t-2xl px-6 bg-background"
      >
        <h3 class="text-lg font-semibold flex items-center gap-3">
          <span
            :class="`p-1 bg-contessa-600 text-white rounded-lg inline-flex `"
          >
            <Icon name="solar:heart-angle-line-duotone" size="24" />
          </span>
          Community Feed
        </h3>
        <span class="flex-ctr gap-1">
          <p
            v-for="dot in 3"
            :key="dot"
            :class="
              cn(
                'h-2 w-2 bg-contessa-500 rounded-full',
                dot === 1
                  ? 'bg-contessa-600'
                  : dot === 2
                  ? 'bg-amber-300'
                  : 'bg-green-500'
              )
            "
          />
        </span>
      </header>
      <NoteCard
        v-for="note in sampleNotes"
        :key="note.id"
        :note="note"
        class="mb-4 border rounded-2xl bg-background"
        read-only
      />

      <footer class="py-4 px-6 -mx-4 border-t rounded-b-2xl bg-background">
        <h3 class="text-lg font-medium pb-2">Trending Topics</h3>
        <ul class="flex flex-wrap gap-2 text-sm">
          <li
            v-for="topic in [
              {
                name: 'PatientSafety',
                color: 'bg-blue-100 text-blue-700',
              },

              {
                name: 'NurseLife',
                color: 'bg-celery-100 text-celery-800',
              },
              { name: 'ContinuingEd', color: 'bg-purple-100 text-purple-700' },
              {
                name: 'Mentorship',
                color: 'bg-contessa-100 text-contessa-700',
              },
            ]"
            :key="topic.name"
          >
            <span :class="`${topic.color} p-1 px-2 rounded-full`"
              >#{{ topic.name }}</span
            >
          </li>
        </ul>
      </footer>
    </div>
  </section>
</template>
