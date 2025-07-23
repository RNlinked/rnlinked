<script setup lang="ts">
import { AccordionTrigger, AccordionItem } from "~/components/ui/accordion";

defineProps<{
  defaultValue?: string;
  value: string;
}>();
</script>
<template>
  <Accordion
    type="single"
    class="w-full"
    collapsible
    :default-value="defaultValue"
    :value="value"
  >
    <AccordionItem :value="value">
      <AccordionTrigger> </AccordionTrigger>
    </AccordionItem>
  </Accordion>
</template>
