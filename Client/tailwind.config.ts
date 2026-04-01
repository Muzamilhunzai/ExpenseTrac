import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff2d78',
        secondary: '#00ffcc',
        tertiary: '#ffe04a',
        background: '#0a0a12',
        surface: '#0f0f1a',
        'surface-container': '#141422',
        'surface-container-high': '#1e1e30',
        'surface-container-highest': '#28283e',
        'surface-dim': '#0f0f1a',
        'on-surface': '#e8e0f0',
        'on-surface-variant': '#a098b0',
        'on-primary': '#1a0010',
        'on-secondary': '#001a1a',
        'outline': '#5a5068',
        'outline-variant': '#302840',
        error: '#ff4444',
      },
      fontFamily: {
        headline: ['var(--font-sora)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        label: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        'neon-primary': '0 0 20px rgba(255, 45, 120, 0.4)',
        'neon-secondary': '0 0 20px rgba(0, 255, 204, 0.4)',
        'neon-tertiary': '0 0 20px rgba(255, 224, 74, 0.4)',
        'neon-primary-sm': '0 0 10px rgba(255, 45, 120, 0.3)',
        'neon-secondary-sm': '0 0 10px rgba(0, 255, 204, 0.3)',
        'glass': 'inset 0 0 12px rgba(255, 45, 120, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grid-primary': `linear-gradient(rgba(255, 45, 120, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 45, 120, 0.05) 1px, transparent 1px)`,
        'grid-secondary': `linear-gradient(rgba(0, 255, 204, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.02) 1px, transparent 1px)`,
        'scanline': `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
        'shimmer-gradient': 'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.05) 50%, transparent 75%)',
      },
    },
  },
  plugins: [],
};

export default config;
