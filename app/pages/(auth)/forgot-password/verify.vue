<script setup lang="ts">
import { resetPasswordSchema } from "~/lib/types/auth";

definePageMeta({
  layout: "auth-layout",
  auth: {
    only: "guest",
  },
});
const route = useRoute();
const { resetPassword, error, loading, sendOTP } = useAuth();

const email: string | null = Array.isArray(route.query.email)
  ? route.query.email[0] ?? null
  : route.query.email ?? null;

const { startCountdown, enabled: resendEnabled, countdown } = useCountdown(0);

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema: resetPasswordSchema,
});

const { value: pin } = useField<string>("pin");
const { value: password } = useField<string>("password");

const onSubmit = handleSubmit(async ({ pin, password }) => {
  await resetPassword({
    email,
    otp: pin,
    password,
  });
});
</script>

<template>
  <div class="space-y-3">
    <h1 class="text-center font-semibold text-lg">Reset your password</h1>
    <p class="text-accent-foreground text-sm text-center">
      We have sent a code to
      <strong> {{ $route.query.email || "jx.akpu@rnlinked.com" }} </strong>
    </p>
  </div>
  <form @submit.prevent="onSubmit" class="w-full space-y-4">
    <p v-if="error" class="text-xs text-center text-contessa-500">
      {{ error }}
    </p>
    <AuthPin label="Enter OTP" :error="errors.pin" v-model="pin" />

    <Input
      type="password"
      name="password"
      placeholder="New Password"
      value=""
      icon="solar:password-line-duotone"
      label="New Password"
      :error="errors.password"
      v-model="password"
    />
    <Button
      type="submit"
      class="rounded-full px-8 font-medium text-white ring-1 text-lg md:tracking-wide w-full"
      label="Reset password"
      :loading="loading"
      :disabled="loading"
    />
    <AuthButtonResendOtp
      :countdown="countdown"
      :resend-enabled="resendEnabled"
      @click="
        sendOTP({
          otpType: 'forget-password',
          startCountDown: startCountdown,
          email,
        })
      "
    />
  </form>
</template>
