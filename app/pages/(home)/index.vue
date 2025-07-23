<script setup>
import { api } from "~/lib/constants";

definePageMeta({
  layout: "app-layout",
});

const { data } = await useFetch(`${api}/notes`);
const { notes, success } = data.value || {};
</script>

<template>
  <AppContainer class="">
    <!-- <JsonData v-for="note in notes" :key="note.id" :data="note" /> -->
    <NoteCard v-for="note in notes" :key="note.id" :note="note" />
  </AppContainer>
</template>
