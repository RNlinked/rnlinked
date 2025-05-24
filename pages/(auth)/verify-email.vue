<script setup lang="ts">
import { toast } from "vue-sonner";
import { verifyEmailSchema } from "~/lib/types/auth";
import { useCountdown } from "~/stores/use-countdown";

definePageMeta({
  layout: "auth-layout",
});

const auth = useAuth();

onMounted(() => {
  if (auth.user?.emailVerified) {
    toast.success("Email already verified");
    navigateTo("/");
  }
});

const { startCountdown, enabled: resendEnabled, countdown } = useCountdown(0);

const { handleSubmit, errors } = useForm({
  validationSchema: verifyEmailSchema,
});
const { value: pin } = useField<string>("pin");
const onSubmit = handleSubmit(({ pin }) => {
  auth.verifyEmail(pin);
});
</script>

<template>
  <div class="space-y-3">
    <h1 class="text-center font-semibold text-lg">Verify your email</h1>
    <p class="text-accent-foreground text-sm text-center">
      We have sent a code to
      <strong> {{ auth.user?.email }} </strong>
    </p>
  </div>
  <form @submit.prevent="onSubmit" class="w-full space-y-8">
    <p v-if="auth.error" class="text-xs text-center text-contessa-500">
      {{ auth.error }}
    </p>
    <AuthPin :error="errors.pin" label="Enter OTP" v-model="pin" />

    <Button
      type="submit"
      class="rounded-full px-8 font-medium text-white ring-1 text-lg md:tracking-wide w-full"
      label="Activate account"
      :loading="auth.loading"
      :disabled="auth.loading"
    />
    <AuthButtonResendOtp
      :countdown="countdown"
      :resend-enabled="resendEnabled"
      @click="
        auth.sendOTP({
          otpType: 'email-verification',
          startCountDown: startCountdown,
        })
      "
    />
  </form>
</template>
