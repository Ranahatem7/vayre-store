// Single source of truth for the visual design system. Every styled
// component imports from here so values stay consistent without CSS files.

export const colors = {
  bg: "#0b0a10",
  bgAlt: "#100e18",
  surface: "#16141f",
  surfaceHover: "#1d1b29",
  border: "rgba(255, 255, 255, 0.08)",
  borderStrong: "rgba(255, 255, 255, 0.16)",

  text: "#f4f2f8",
  textMuted: "#a39fb0",
  textFaint: "#6f6b7d",

  // A real ramp around one hero purple, not one flat color.
  purple: {
    900: "#1c0b33",
    800: "#2e1252",
    700: "#441c76",
    600: "#5f27a3",
    500: "#7c3aed",
    400: "#9d5cf5",
    300: "#b98bf9",
    200: "#d6bafc",
    100: "#ede1fd",
  },

  // One distinct hue per order status.
  status: {
    Pending: "#f5a524",
    Paid: "#3b82f6",
    Shipped: "#9d5cf5",
    Delivered: "#34d399",
    Cancelled: "#f87171",
  },

  danger: "#f87171",
  dangerBg: "rgba(248, 113, 113, 0.12)",
};

export const fonts = {
  heading: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const shadows = {
  sm: "0 2px 8px rgba(0, 0, 0, 0.3)",
  md: "0 8px 24px rgba(0, 0, 0, 0.35)",
  lg: "0 20px 48px rgba(0, 0, 0, 0.45)",
  glow: "0 0 32px rgba(157, 92, 245, 0.35)",
};

// Mobile-first: this is the min-width at which useIsDesktop flips to true.
export const BREAKPOINT = 768;
