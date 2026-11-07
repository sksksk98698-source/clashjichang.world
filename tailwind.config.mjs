/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        section: 'clamp(5rem, 10vw, 8rem)',
        content: 'clamp(1.25rem, 3vw, 2rem)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        heading: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      colors: {
        ink: '#102a2b',
        muted: '#5e7473',
        paper: '#f7f8f3',
        moss: { DEFAULT: '#1f6b58', dark: '#15483d' },
        coral: '#b64f3b',
        'coral-bright': '#e8795f',
        line: '#dce5df',
        primary: {
          500: '#2d8b70',
          600: '#1f6b58',
          700: '#15483d',
        },
      },
    },
  },
  plugins: [],
};
