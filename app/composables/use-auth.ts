import type { RouteLocationRaw } from "vue-router";
import { createAuthClient } from "better-auth/vue";
import {
  emailOTPClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import type { ClientOptions, InferSessionFromClient } from "better-auth";
import { authFetch } from "~/lib/utils/auth-fetch";
import type { SignInFormData, SignUpFormData } from "~/lib/types/auth";
import { toast } from "vue-sonner";
import { authClient } from "~/lib/auth-client";
import type { User } from "~/lib/types";

interface RuntimeAuthConfig {
  redirectUserTo: RouteLocationRaw | string;
  redirectGuestTo: RouteLocationRaw | string;
}
type EmailSignIn = SignInFormData & {
  provider?: "email";
};

type GoogleSignIn = {
  provider: "google";
};
type SignInPayload = EmailSignIn | GoogleSignIn;

type ErrorType = {
  message?: string;
  status?: number;
  statusText?: string;
};

export const useAuth = () => {
  const router = useRouter();
  const url = useRequestURL();
  const headers = import.meta.server ? useRequestHeaders() : undefined;
  const callbackURL = "http://localhost:3000/";

  const client = createAuthClient({
    baseURL: "http://localhost:8001",
    fetchOptions: {
      headers,
    },
    plugins: [
      emailOTPClient(),
      inferAdditionalFields({
        user: {
          username: { type: "string" },
          role: { type: "string", input: false },
          bio: { type: "string", input: false },
        },
      }),
    ],
  });

  const session = useState<InferSessionFromClient<ClientOptions> | null>(
    "auth:session",
    () => null
  );
  const user = useState<User | null>("auth:user", () => null);

  const sessionFetching = import.meta.server
    ? ref(false)
    : useState("auth:sessionFetching", () => false);

  const error = useState<ErrorType | null>("auth:error", () => null);

  const loading = useState("auth:loading", () => false);

  const handleError = (message: string, err?: unknown | undefined) => {
    if (error.value) {
      error.value.message = message || "An error occurred";
    }
    toast.error(message);
    err && console.error(`${message}: `, err);
  };

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return;
    }
    sessionFetching.value = true;
    const { data } = await client.useSession(authFetch);
    session.value = data.value?.session || null;
    user.value = data?.value?.user
      ? { ...data.value.user, image: data.value.user.image ?? undefined }
      : null;

    sessionFetching.value = false;
    return data;
  };

  if (import.meta.client) {
    client.$store.listen("$sessionSignal", async (signal) => {
      if (!signal) return;
      await fetchSession();
    });
  }

  const signIn = async (payload: SignInPayload) => {
    loading.value = true;
    error.value = null;
    try {
      if (payload.provider === "google") {
        await client.signIn.social(
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
        await client.signIn.email(
          {
            email,
            password,
            callbackURL,
          },
          {
            onSuccess: () => {
              toast.success("Signed in successfully");
            },

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
    loading.value = false;
  };

  const signUp = async (payload: SignUpFormData) => {
    loading.value = true;
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
    } finally {
      loading.value = false;
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
    loading.value = true;
    error.value = null;
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
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (payload: {
    email: string | null;
    password: string;
    otp: string;
  }) => {
    loading.value = true;
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
    } finally {
      loading.value = false;
    }
  };

  const signOut = async ({
    redirectTo,
  }: { redirectTo?: RouteLocationRaw } = {}) => {
    const res = await client.signOut();
    session.value = null;
    user.value = null;
    if (redirectTo) {
      navigateTo(redirectTo);
    }
    return res;
  };
  return {
    session,
    user,
    client,
    errorCodes: client.$ERROR_CODES,
    error,
    loading,
    loggedIn: computed(() => !!session.value),
    fetchSession,
    signIn,
    signUp,
    sendOTP,
    resetPassword,
    signOut,
  };
};
