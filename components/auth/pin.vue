<script setup lang="ts"></script>
<template>
  <PinInput
    id="pin-input"
    placeholder="○"
    type="number"
    class="w-full flex-ctr"
  >
    <PinInputGroup class="gap-1 w-full">
      <template v-for="(id, index) in 6" :key="id">
        <PinInputSlot class="rounded-md border" :index="index" />
        <template v-if="index !== 5">
          <PinInputSeparator />
        </template>
      </template>
    </PinInputGroup>
  </PinInput>
</template>
