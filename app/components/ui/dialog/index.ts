import { cva, type VariantProps } from "class-variance-authority";

export { default as Dialog } from "./Dialog.vue";
export { default as DialogClose } from "./DialogClose.vue";
export { default as DialogContent } from "./DialogContent.vue";
export { default as DialogDescription } from "./DialogDescription.vue";
export { default as DialogFooter } from "./DialogFooter.vue";
export { default as DialogHeader } from "./DialogHeader.vue";
export { default as DialogOverlay } from "./DialogOverlay.vue";
export { default as DialogScrollContent } from "./DialogScrollContent.vue";
export { default as DialogTitle } from "./DialogTitle.vue";
export { default as DialogTrigger } from "./DialogTrigger.vue";

export const dialogVariants = cva(
  "fixed left-[50%]  z-50 grid w-full translate-x-[-50%] gap-4 border bg-background p-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",

  {
    variants: {
      placement: {
        default: "top-[50%]  translate-y-[-50%]",
        top: "top-[5%]",
        bottom: "bottom-[0%]",
      },
      size: {
        default: "max-w-lg",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        full: "max-w-screen h-screen top-0 bottom-0",
      },
    },
    defaultVariants: {
      placement: "default",
      size: "default",
    },
  }
);

export type DialogVariants = VariantProps<typeof dialogVariants>;
