import type { HTMLAttributes } from "vue";

export type NavItemProps = {
  label?: string;
  icon?: string;
  route?: string;
  onClick?: () => void;
  disabled?: boolean;
  disabledMessage?: string;
  class?: HTMLAttributes["class"];
};
