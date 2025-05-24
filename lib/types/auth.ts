import { z } from "zod";

const userModSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Enter a valid email"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
  name: z
    .string({
      required_error: "Name cannot be blank",
    })
    .min(3, "Name must be at least 3 characters"),

  pin: z.string({ required_error: "OTP is required" }).max(6, {
    message: "Pin must be 6 digits",
  }),
});

const zSignUp = userModSchema.pick({
  name: true,
  email: true,
  password: true,
});

const zSignIn = userModSchema.pick({
  email: true,
  password: true,
});

const zVerify = userModSchema.pick({
  pin: true,
});

const zRequestOtp = userModSchema.pick({
  email: true,
});

const zResetPassword = userModSchema.pick({
  password: true,
  pin: true,
});

const signInSchema = toTypedSchema(zSignIn);
const signUpSchema = toTypedSchema(zSignUp);
const verifyEmailSchema = toTypedSchema(zVerify);
const requestOtpSchema = toTypedSchema(zRequestOtp);
const resetPasswordSchema = toTypedSchema(zResetPassword);

type SignUpFormData = z.infer<typeof zSignUp>;
type SignInFormData = z.infer<typeof zSignIn>;
type VerifyEmailFormData = z.infer<typeof zVerify>;
type RequestOtpFormData = z.infer<typeof zRequestOtp>;
type ResetPasswordFormData = z.infer<typeof zResetPassword>;

export {
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
  requestOtpSchema,
  resetPasswordSchema,
};
export type {
  SignUpFormData,
  SignInFormData,
  VerifyEmailFormData,
  RequestOtpFormData,
  ResetPasswordFormData,
};
