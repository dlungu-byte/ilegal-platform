import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors:{ primary:"#4338CA", secondary:"#10B981" } } },
  plugins: []
} satisfies Config;
