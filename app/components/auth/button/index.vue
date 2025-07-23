<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Button } from "~/components/ui/button";

const props = defineProps<{
  label?: string;
  authType: "sign-in" | "sign-up" | "signout";
  scroll?: boolean;
  callbackUrl?: string;
  replace?: boolean;
  class?: HTMLAttributes["class"];
}>();

const defaultLabel = {
  "sign-in": "Sign in",
  "sign-up": "Sign up",
  signout: "Sign out",
};
const defaultLabelText =
  defaultLabel[props.authType as keyof typeof defaultLabel];
const label = props.label || defaultLabelText;

const redirectQuery = props.callbackUrl ? `?redirect=${props.callbackUrl}` : "";
const authUrl = `/${props.authType}${redirectQuery}`;
</script>

<template>
  <NuxtLink v-if="authType !== 'signout'" :to="authUrl" :class="props.class">{{
    label
  }}</NuxtLink>
  <Button v-else :class="props.class">
    {{ label }}
  </Button>
</template>
