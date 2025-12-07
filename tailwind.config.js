/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Health-tech palette
        'brand-cyan': '#00d4ff',
        'brand-cyan-dark': '#0099ff',
        'brand-purple': '#7c3aed',
        'brand-purple-dark': '#6d28d9',
        'brand-green': '#10b981',
        'brand-red': '#ef4444',
        'dark-bg': '#0a0e27',
        'dark-surface': '#141829',
        'dark-surface-alt': '#16213e',
        'dark-text': '#a0aec0',
      },
      gradients: {
        'primary': 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
        'secondary': 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
        'dark-bg': 'linear-gradient(135deg, #0a0e27 0%, #16213e 50%, #1a1f3a 100%)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-wave': 'pulseWave 2s ease-out infinite',
        'fade-in-out': 'fadeInOut 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out 0.3s backwards',
        'slide-down': 'slideDown 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'fade-in-scale': 'fadeInScale 0.8s ease-out',
        'float-particle': 'floatParticle 8s infinite linear',
        'ripple': 'ripple 0.6s ease-out',
        'loading-progress': 'loadingProgress 2s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        pulseWave: {
          '0%': { r: '30px', opacity: '1' },
          '100%': { r: '80px', opacity: '0' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          'from': { opacity: '0', transform: 'translateX(30px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          'from': { opacity: '0', transform: 'translateX(-30px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInScale: {
          'from': { opacity: '0', transform: 'scale(0.9)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        floatParticle: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-100vh) translateX(var(--tx, 0))', opacity: '0' },
        },
        ripple: {
          'to': {
            width: '300px',
            height: '300px',
            opacity: '0',
          },
        },
        loadingProgress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropFilter: {
        'blur': 'blur(10px)',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(0, 212, 255, 0.4)',
        'glow-cyan-sm': '0 0 20px rgba(0, 212, 255, 0.2)',
        'glow-purple': '0 0 30px rgba(124, 58, 237, 0.3)',
      },
    },
  },
  plugins: [],
}