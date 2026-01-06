export type AlertBackdrop = "default" | "light" | "blur";

export const ALERT_BACKDROP_CLASS: Record<AlertBackdrop, string> = {
  default: "bg-[rgba(36,38,40,0.3)]",
  light: "bg-[rgba(36,38,40,0.5)]",
  blur: "bg-[rgba(36,38,40,0.5)] backdrop-blur-[7px]",
};
