<script setup lang="ts">
import { cn } from "@/lib/utils";

const route = useRoute();
const showForm = computed(() => route.query.flow === "email");
const isSignUp = computed(() => route.name === "sign-up");
const error = ref<string | null>(null);
</script>

<template>
  <div class="space-y-3 w-full">
    <p v-if="error" class="text-center text-xs text-contessa-900">
      {{ error }}
    </p>

    <AuthButtonGoogle />
    <AuthDivider />
    <div v-if="showForm" class="w-full flex-ctr">
      <Button
        variant="ghost"
        :class="
          cn(' border-b-3 rounded-none flex-1', {
            ' border-celery-600': !isSignUp,
          })
        "
        label="Sign in"
        @click="
          $router.replace({
            name: 'sign-in',
            query: { ...route.query },
          })
        "
      />
      <Button
        variant="ghost"
        :class="
          cn('border-b-3 rounded-none  flex-1', {
            'border-celery-600': isSignUp,
          })
        "
        label="Sign up"
        @click="
          $router.replace({
            name: 'sign-up',
            query: { ...route.query },
          })
        "
      />
    </div>
    <AuthForm v-if="showForm" isSignup />

    <Button
      v-else
      variant="outline"
      class="dark-border rounded-full tracking-wide w-full"
      label="Continue with Email"
      icon="solar:letter-line-duotone"
      @click="
        $router.replace({
          name: isSignUp ? 'sign-up' : 'sign-in',
          query: { flow: 'email' },
        })
      "
    />
  </div>
</template>
