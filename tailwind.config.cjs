/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,t s,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          925: '#121212',
        },
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
}
