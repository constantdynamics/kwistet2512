/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF00FF',
        'neon-pink-dark': '#FF0080',
        'neon-cyan': '#00FFFF',
        'neon-cyan-dark': '#0080FF',
        'electric-purple': '#8000FF',
        'electric-purple-dark': '#9C27B0',
        'deep-purple': '#1A0B2E',
        'deep-purple-light': '#2D1B69',
        'vapor-success': '#00FF41',
        'vapor-success-light': '#39FF14',
        'vapor-error': '#FF0080',
      },
      fontFamily: {
        'mono': ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
        'display': ['Orbitron', 'Exo 2', 'sans-serif'],
        'body': ['Inter', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'vapor-gradient': 'linear-gradient(135deg, #FF00FF, #00FFFF)',
        'vapor-gradient-dark': 'linear-gradient(135deg, #FF0080, #8000FF)',
        'vapor-bg': 'linear-gradient(180deg, #1A0B2E 0%, #2D1B69 50%, #1A0B2E 100%)',
        'grid-pattern': `
          linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
        `,
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
        'neon-cyan': '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(128, 0, 255, 0.5), 0 0 40px rgba(128, 0, 255, 0.3)',
        'neon-success': '0 0 40px rgba(0, 255, 65, 0.8)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 0.5s ease-in-out',
        'shake': 'shake 0.3s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)' },
          '50%': { boxShadow: '0 0 60px rgba(0, 255, 65, 1)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      transitionTimingFunction: {
        'vapor': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
