<script setup lang="ts">
const router = useRouter();

const emit = defineEmits<{}>();
const isSignup = computed(() => {
  const route = useRoute();
  return route.name === "sign-up";
});

// const props = defineProps<{
//   isSignup?: boolean;
// }>();

const onSubmit = () => {
  if (isSignup) {
    router.push({
      name: "verify-email",
    });
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit()" class="w-full space-y-3">
    {{ isSignup }}
    <Input
      v-if="isSignup"
      type="text"
      placeholder="Fullname"
      icon="solar:user-bold-duotone"
    />
    <Input
      type="email"
      name="email"
      placeholder="Email"
      icon="solar:letter-line-duotone"
    />
    <Input
      type="password"
      name="password"
      placeholder="Password"
      value=""
      icon="solar:password-line-duotone"
    >
      <template v-if="!isSignup" #right-label>
        <Button
          variant="link"
          class="-my-2.5"
          label="Forgot password?"
          @click="
            $router.push({
              name: 'forgot-password-request-otp',
            })
          "
        />
      </template>
    </Input>
    <Button
      type="submit"
      class="rounded-full px-8 font-medium text-white ring-1 text-lg md:tracking-wide w-full"
      :label="isSignup ? 'Sign up' : 'Sign in'"
    />
  </form>
</template>
