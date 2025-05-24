import {
  emailOTPClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:8001",
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

export type Session = typeof authClient.$Infer.Session;
