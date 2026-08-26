export const colors = {
  background: "#f6fdf8",
  foreground: "#17251c",

  card: "#ffffff",
  muted: "#e8f5eb",
  mutedForeground: "#64746a",

  primary: "#16a34a",
  accent: "#15803d",

  border: "#cfe6d5",

  success: "#22c55e",
  destructive: "#dc2626",

  subscription: "#65a30d",
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  30: 120,
} as const;

export const components = {
  tabBar: {
    height: spacing[18],
    horizontalInset: spacing[5],
    radius: spacing[8],
    iconFrame: spacing[12],
    itemPaddingVertical: spacing[2],
  },
} as const;

export const theme = {
  colors,
  spacing,
  components,
} as const;
