<script setup lang="ts">
import { shapeItemsMobile } from "~/lib/constants/shape-list";
</script>
<template>
  <div class="grid grid-cols-2 sm:hidden gap-2 w-full mx-auto pl-3 scale-90">
    <span v-for="shape in shapeItemsMobile">
      <AppLandingShape :shape="shape" />
    </span>
  </div>
</template>
