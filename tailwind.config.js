/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tema baru — pure black ala bioskop
        'chill-bg': '#0a0a0a',       // background utama
        'chill-card': '#1a1a1a',     // card / surface
        'chill-border': '#2a2a2a',   // border halus
        'chill-muted': '#9ca3af',    // teks sekunder
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        // Cinema background untuk login & register
        'auth-cinema':
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80')",
      },
      boxShadow: {
        'card': '0 25px 50px -12px rgba(0,0,0,0.9)',
        'menu': '0 10px 25px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
