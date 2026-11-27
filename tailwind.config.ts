import type { Config } from "tailwindcss";

/* Notraffix tokens.
   Warm paper ground with asphalt bands, one action colour (signal amber).
   Components use these names only — never raw hex. */
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "820px", lg: "1080px", xl: "1320px" },
    extend: {
      colors: {
        paper: "#F2F0EB",
        stone: "#E7E4DD",
        line: "#D9D5CC",
        ink: "#15171B",
        asphalt: "#1D2025",
        body: "#585C63",
        muted: "#8A8E95",
        signal: "#F5A300",
        "signal-deep": "#D98E00",
        go: "#2FB36B",
        stop: "#E5483B",
        night: "#151513",
        "night-2": "#1E1D1A",
        "night-3": "#272622",
        gold: "#E8B55A",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3rem, 7.4vw, 7.25rem)", { lineHeight: "0.94", letterSpacing: "-0.05em" }],
        display: ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.045em" }],
        title: ["clamp(2rem, 3.6vw, 3.25rem)", { lineHeight: "1.04", letterSpacing: "-0.04em" }],
        lead: ["clamp(1.125rem, 1.4vw, 1.3rem)", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
      },
      borderRadius: { lg: "14px", xl: "20px", "2xl": "28px" },
      maxWidth: { site: "1360px" },
      transitionTimingFunction: { out: "cubic-bezier(.16,1,.3,1)" },
    },
  },
  plugins: [],
} satisfies Config;
