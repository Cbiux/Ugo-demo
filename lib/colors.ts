export const ugoColors = {
  primary: "#2C3E50", // Dark charcoal from wallet
  red: "#FF5757", // Food card
  orange: "#FFA726", // Transport card
  blue: "#42A5F5", // Books/Education card
  green: "#66BB6A", // ID/Access card
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  // Dark mode colors
  dark: {
    bg: "#0F172A",
    surface: "#1E293B",
    card: "#334155",
    text: "#F1F5F9",
    textSecondary: "#CBD5E1",
    border: "#475569",
  },
}

export const getThemeColors = (isDark: boolean) => ({
  bg: isDark ? ugoColors.dark.bg : ugoColors.gray[50],
  surface: isDark ? ugoColors.dark.surface : ugoColors.white,
  card: isDark ? ugoColors.dark.card : ugoColors.white,
  text: isDark ? ugoColors.dark.text : ugoColors.gray[900],
  textSecondary: isDark ? ugoColors.dark.textSecondary : ugoColors.gray[600],
  border: isDark ? ugoColors.dark.border : ugoColors.gray[200],
})
