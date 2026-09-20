export type TextSize = "normal" | "large" | "xlarge";
export type Contrast = "standard" | "high";

export type Settings = {
  textSize: TextSize;
  contrast: Contrast;
  reduceMotion: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  textSize: "normal",
  contrast: "standard",
  reduceMotion: false,
};

export const TEXT_SIZE_PERCENT: Record<TextSize, string> = {
  normal: "100%",
  large: "125%",
  xlarge: "150%",
};