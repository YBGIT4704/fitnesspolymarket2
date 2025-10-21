import { defineConfig } from '@tailwindcss/postcss'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'polymarket': {
          'dark': '#0a0a0a',
          'card': '#1a1a1a',
          'border': '#2a2a2a',
          'text': '#ffffff',
          'text-muted': '#a0a0a0',
          'accent': '#3b82f6',
          'success': '#10b981',
          'danger': '#ef4444',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
})
