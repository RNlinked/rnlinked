<script setup lang="ts">
import { cn } from "@/lib/utils";
import { getShapeClass, type ShapeItem } from "~/lib/constants/shape-list";

const props = defineProps<{ shape: ShapeItem }>();
const { shape } = props;

const shapeClass = getShapeClass(shape.type);
const shapeColor = shape.color;
const hasImage = shape.image ? true : false;
const hasText = shape.text ? true : false;
</script>

<template>
  <div
    v-if="hasImage"
    :class="cn('inline-block md:shrink-0', shapeClass, shapeColor)"
  >
    <img :src="shape.image" alt="hero image" :class="shapeClass" />
  </div>
  <div
    v-else
    :class="
      cn(
        'inline-flex items-center md:shrink-0',
        shapeClass,
        shapeColor || 'bg-celery-100'
      )
    "
  >
    <p
      v-if="hasText"
      class="font-semibold text-left text-2xl leading-10 p-8 pl-5 dark:text-background"
    >
      {{ shape.text }}
    </p>
  </div>
</template>
