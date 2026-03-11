import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SA Flag inspired palette
        primary: {
          DEFAULT: "#007A4D",
          50: "#E6F4EF",
          100: "#C2E5D7",
          200: "#9DD4BE",
          300: "#70C1A3",
          400: "#3DAC87",
          500: "#007A4D",
          600: "#006840",
          700: "#005534",
          800: "#004228",
          900: "#002F1C",
        },
        secondary: {
          DEFAULT: "#FFB612",
          50: "#FFF8E6",
          100: "#FFEEC2",
          200: "#FFE09D",
          300: "#FFD070",
          400: "#FFC23D",
          500: "#FFB612",
          600: "#E09800",
          700: "#B87B00",
          800: "#8F5F00",
          900: "#664400",
        },
        accent: {
          DEFAULT: "#002395",
          50: "#E6EAFF",
          100: "#C2CBFF",
          200: "#9DACFF",
          300: "#6F88FF",
          400: "#3A5EFF",
          500: "#002395",
          600: "#001E80",
          700: "#001869",
          800: "#001252",
          900: "#000C3B",
        },
        sa: {
          green: "#007A4D",
          gold: "#FFB612",
          blue: "#002395",
          red: "#DE3831",
          black: "#000000",
          white: "#FFFFFF",
        },
        surface: "#FAFAF7",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Module colors
        module: {
          1: "#007A4D",  // SA Green
          2: "#002395",  // SA Blue
          3: "#FFB612",  // SA Gold
          4: "#9333EA",  // Purple
          5: "#0891B2",  // Cyan
          6: "#DE3831",  // SA Red
          7: "#16A34A",  // Forest Green
          8: "#F59E0B",  // Amber
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
