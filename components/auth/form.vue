<script setup lang="ts">
import {
  signInSchema,
  signUpSchema,
  type SignInFormData,
  type SignUpFormData,
} from "~/lib/types/auth";

const route = useRoute();

const isSignup = computed(() => {
  return route.name === "sign-up";
});

const { signIn, signUp, error, loading } = useAuth();

type AuthFields = "email" | "password" | "name";

const { handleSubmit, errors } = useForm<{
  [K in AuthFields]?: string;
}>({
  validationSchema: route.name === "sign-up" ? signUpSchema : signInSchema,
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");
const { value: name } = useField<string>("name");

const onSubmit = handleSubmit((values) => {
  if (isSignup.value) {
    return signUp(values as SignUpFormData);
  } else {
    return signIn(values as SignInFormData);
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit()" class="w-full space-y-3">
    <p v-if="error" class="text-center text-xs text-contessa-500 -mb-0.5">
      {{ error }}
    </p>
    <Input
      v-if="isSignup"
      type="text"
      placeholder="Fullname"
      icon="solar:user-bold-duotone"
      :error="errors.name"
      v-model="name"
    />
    <Input
      type="email"
      name="email"
      placeholder="Email"
      icon="solar:letter-line-duotone"
      v-model="email"
      :error="errors.email"
    />
    <Input
      type="password"
      name="password"
      placeholder="Password"
      value=""
      icon="solar:password-line-duotone"
      v-model="password"
      :error="errors.password"
    >
      <template v-if="!isSignup" #right-label>
        <Button
          type="button"
          variant="link"
          class="-my-2.5"
          label="Forgot password?"
          @click="
            $router.push({
              name: 'forgot-password',
            })
          "
        />
      </template>
    </Input>
    <Button
      type="submit"
      class="rounded-full px-8 font-medium text-white ring-1 text-lg md:tracking-wide w-full"
      :label="isSignup ? 'Sign up' : 'Sign in'"
      :loading="loading"
      :disabled="loading"
    />
  </form>
</template>
