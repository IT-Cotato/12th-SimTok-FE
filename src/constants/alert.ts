export type AlertBackdrop = "default" | "light" | "blur";

export const ALERT_BACKDROP_CLASS: Record<AlertBackdrop, string> = {
  default: "bg-neutral-01/30",
  light: "bg-neutral-01/50",
  blur: "bg-neutral-01/50 backdrop-blur-[7px]",
};
