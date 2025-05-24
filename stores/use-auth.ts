import type { handleError } from "vue";
import { toast } from "vue-sonner";
import type { string } from "zod";
import { authClient } from "~/lib/auth-client";
import type { SignInFormData, SignUpFormData } from "~/lib/types/auth";

type EmailSignIn = SignInFormData & {
  provider?: "email";
};

type GoogleSignIn = {
  provider: "google";
};
type SignIn = EmailSignIn | GoogleSignIn;

export const useAuth = defineStore("useAuth", () => {
  const router = useRouter();
  const session = authClient.useSession();
  const user = computed(() => session.value.data?.user);
  const loading = computed(
    () => session.value.isPending || session.value.isRefetching
  );
  const isAuthenticated = computed(() => {
    return session.value.data?.user !== null;
  });

  const error = ref<string | null>(null);
  const callbackURL = "http://localhost:3000/";

  const handleError = (message: string, err?: unknown | undefined) => {
    error.value = message;
    toast.error(message);
    err && console.error(`${message}: `, err);
  };
  async function signIn(payload: SignIn) {
    try {
      if (payload.provider === "google") {
        await authClient.signIn.social(
          {
            provider: "google",
            callbackURL,
          },
          {
            onError: (ctx: { error: { message: string } }) => {
              return handleError(
                ctx.error.message || "Error signing in with Google"
              );
            },
          }
        );
      } else {
        const { email, password } = payload;
        if (!email || !password) {
          return handleError("Email and password are required");
        }
        await authClient.signIn.email(
          {
            email,
            password,
            callbackURL,
          },
          {
            onError: (ctx: { error: { message: string } }) => {
              return handleError(
                ctx.error.message || "Error signing in with email"
              );
            },
          }
        );
      }
    } catch (err) {
      handleError("Error signing in", err);
    }
  }

  const signUp = async (payload: SignUpFormData) => {
    error.value = null;
    try {
      const { email, password, name } = payload;
      if (!email || !password || !name) {
        return handleError("Email, password, and name are required");
      }

      await authClient.signUp.email(
        {
          email,
          password,
          name,
          username: email,
        },
        {
          onSuccess() {
            router.replace({
              name: "verify-email",
            });
          },
          onError(ctx: { error: { message: string } }) {
            return handleError(ctx.error.message || "Error signing up");
          },
        }
      );
    } catch (err) {
      handleError("Error signing up", err);
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      handleError("Error signing out", error);
    }
  };

  const verifyEmail = async (otp: string) => {
    error.value = null;
    const email = session.value.data?.user?.email;

    if (!email) {
      return handleError("Email is required");
    }

    try {
      await authClient.emailOtp.verifyEmail(
        {
          email,
          otp,
        },
        {
          onError(ctx: { error: { message: string } }) {
            return handleError(ctx.error.message || "Error verifying email");
          },
          onSuccess() {
            toast.success("Email verified successfully");
            router.replace("/");
          },
        }
      );
    } catch (err) {
      handleError("Error verifying email", err);
    }
  };

  const sendOTP = async ({
    otpType,
    email,
    startCountDown,
  }: {
    otpType: "sign-in" | "forget-password" | "email-verification";
    email?: string | null;
    startCountDown?: (duration: number) => void;
  }) => {
    const resolvedEemail = email || user.value?.email;
    if (!resolvedEemail) {
      return handleError("Email is required");
    }

    try {
      await authClient.emailOtp.sendVerificationOtp(
        { email: resolvedEemail, type: otpType },
        {
          onError(ctx: { error: { message: string } }) {
            handleError(ctx.error.message || "Error sending OTP");
          },
          onSuccess() {
            toast.success("OTP sent successfully");
            if (startCountDown) {
              startCountDown(60);
            }
          },
        }
      );
    } catch (err) {
      handleError("Error sending OTP", err);
    }
  };

  const resetPassword = async (payload: {
    email: string | null;
    password: string;
    otp: string;
  }) => {
    error.value = null;
    const { email, password, otp } = payload;

    if (!email || !password || !otp) {
      return handleError("Email, password, and OTP are required");
    }

    try {
      await authClient.emailOtp.resetPassword(
        {
          email,
          password,
          otp,
        },
        {
          onError(ctx: { error: { message: string } }) {
            return handleError(ctx.error.message || "Error resetting password");
          },
          onSuccess() {
            toast.success("Password reset successfully");
            router.replace({ name: "sign-in", query: { flow: "email" } });
          },
        }
      );
    } catch (err) {
      handleError("Error resetting password", err);
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    verifyEmail,
    sendOTP,
    resetPassword,
    loading,
    error,
    user,
    isAuthenticated,
  };
});
