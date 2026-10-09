import type { Config } from "tailwindcss";

// Varredura de quais pastas tem as classes necessarias
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#121212",    // Preto da marca
          yellow: "#FFB800",   // Amarelo do logo
          cream: "#FAF6F0",    // Fundo creme aconchegante
        },
        status: {
          success: "#10B981",  // Verde (Aberto / Pago)
          warning: "#F97316",  // Laranja (Atenção / Em Preparo)
          danger: "#EF4444",   // Vermelho (Atrasado / Cancelado)
        }
      },
      fontFamily: {
        sans: ["var(--font-fredoka)", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
