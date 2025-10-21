/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
          foreground: '#1A1A2E',
          dark: '#1A1A2E',
          'dark-foreground': '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F8F9FA',
          foreground: '#4A5568',
          dark: '#2D2D44',
          'dark-foreground': '#B8B8CC',
        },
        tertiary: {
          DEFAULT: '#E9ECEF',
          foreground: '#1A1A2E',
          dark: '#3A3A5C',
          'dark-foreground': '#FFFFFF',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#1A1A2E',
        },
        foreground: {
          DEFAULT: '#1A1A2E',
          dark: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F8F9FA',
          foreground: '#718096',
          dark: '#2D2D44',
          'dark-foreground': '#8A8A9A',
        },
        accent: {
          purple: '#8B5CF6',
          blue: '#3B82F6',
          orange: '#F59E0B',
          green: '#10B981',
          red: '#EF4444',
          pink: '#EC4899',
        },
        category: {
          food: '#F59E0B',
          workout: '#FBBF24',
          work: '#8B5CF6',
          design: '#3B82F6',
          run: '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['System', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
