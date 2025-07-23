import { cva, type VariantProps } from "class-variance-authority";

export { default as Avatar } from "./Avatar.vue";
export { default as AvatarFallback } from "./AvatarFallback.vue";
export { default as AvatarImage } from "./AvatarImage.vue";

export const avatarVariants = cva(
  "relative flex items-center justify-center shrink-0 overflow-hidden ",
  {
    variants: {
      size: {
        xs: "size-8 text-sm",
        sm: "size-10 text-md",
        md: "size-12 text-lg",
        lg: "size-16 text-xl",
        xl: "size-20 text-2xl",
        "2xl": "size-24 text-3xl",
        "3xl": "size-32 text-4xl",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      radius: "2xl",
    },
  }
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;
