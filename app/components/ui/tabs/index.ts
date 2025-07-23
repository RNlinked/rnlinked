import { cva, type VariantProps } from "class-variance-authority";

export { default as Tabs } from "./Tabs.vue";
export { default as TabsContent } from "./TabsContent.vue";
export { default as TabsList } from "./TabsList.vue";
export { default as TabsTrigger } from "./TabsTrigger.vue";

export const tabsListVariants = cva(
  "text-muted-foreground inline-flex h-9 w-fit items-center justify-center p-[3px]",
  {
    variants: {
      variant: {
        rounded: "bg-muted rounded-lg",
        flat: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "flat",
    },
  }
);

export const tabsTriggerVariants = cva(
  " dark:data-[state=active]:text-foreground hover:hover-bg focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 border-b  px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        rounded:
          "data-[state=active]:bg-background rounded-md border  border-transparent data-[state=active]:shadow-sm",
        flat: "data-[state=active]:border-celery-600 data-[state=active]:border-b-3  border-b ",
      },
    },
    defaultVariants: {
      variant: "flat",
    },
  }
);

export type TabsListVariants = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
