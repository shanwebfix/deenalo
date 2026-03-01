/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f9fafb',
          100: '#f0f1f3',
          200: '#dcdfe4',
          300: '#b3b9c4',
          400: '#8590a2',
          500: '#5f6b7f',
          600: '#4a5568',
          700: '#3d4556',
          800: '#2d3440',
          900: '#1e222b',
        },
      },
      fontFamily: {
        arabic: ['Amiri', 'Traditional Arabic', 'Scheherazade', 'serif'],
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}