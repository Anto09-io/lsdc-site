import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Design system LSDC — clair + violet ──
        // Aligné sur la couverture de la Méthode Watt/kg et le compte Instagram.
        paper: "#FFFFFF", // fond principal (blanc)
        surface: "#F4F4F5", // fond des cartes/éléments élevés (gris très clair)
        carbon: "#0B0B0C", // texte principal et boutons (noir)
        violet: {
          DEFAULT: "#9F01FF", // accent — violet exact de la couverture de l'ebook
          dark: "#7C00C9",
          light: "#B84DFF",
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
        card: "0 1px 3px rgba(11,11,12,0.08)",
        "card-hover": "0 12px 32px rgba(159,1,255,0.18)",
      },
      keyframes: {
        // Gradient violet animé (accent)
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Onde lumineuse qui pulse autour des CTA principaux (radar ping)
        "pulse-glow": {
          "0%": { boxShadow: "0 0 0 0 rgba(159,1,255,0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(159,1,255,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(159,1,255,0)" },
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
