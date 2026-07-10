import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Design system LSDC — dark + vert ──
        ink: "#0B0B0C", // fond principal (noir profond)
        surface: "#18181B", // fond des cartes/éléments élevés
        cream: "#F5F1E8", // texte principal (blanc cassé chaleureux)
        green: {
          DEFAULT: "#22C55E", // accent CTA signature
          dark: "#16A34A",
          light: "#4ADE80",
        },
      },
      fontFamily: {
        // Titres éditoriaux (Barlow Condensed) et corps de texte (Inter)
        display: ["var(--font-barlow)", "Barlow Condensed", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        // Annotations griffonnées (flèches d'appel à l'action)
        script: ["var(--font-caveat)", "cursive"],
      },
      maxWidth: {
        prose: "42rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.3)",
        "card-hover": "0 12px 32px rgba(34,197,94,0.16)",
      },
      keyframes: {
        // Gradient vert animé (accent)
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Onde lumineuse qui pulse autour des CTA principaux (radar ping)
        "pulse-glow": {
          "0%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(34,197,94,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0)" },
        },
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        "pulse-glow": "pulse-glow 2.4s ease-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
