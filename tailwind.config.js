/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== BREAKPOINTS =====
      screens: {
        'xs': '475px',        // Extra small mobile
        // 'sm': '640px',      // default Tailwind
        // 'md': '768px',      // default Tailwind
        // 'lg': '1024px',     // default Tailwind
        // 'xl': '1280px',     // default Tailwind
        // '2xl': '1536px',    // default Tailwind
      },

      // ===== COLORS =====
      colors: {
        // Tema chill - pure black bioskop
        'chill-bg': '#0a0a0a',       // background utama
        'chill-card': '#1a1a1a',     // card / surface
        'chill-border': '#2a2a2a',   // border halus
        'chill-muted': '#9ca3af',    // teks sekunder

        // Extra chill colors (untuk konsistensi)
        'chill-hover': '#242424',    // hover state
        'chill-accent': '#6366f1',   // indigo accent (primary)
        'chill-success': '#10b981',  // green success
        'chill-warning': '#f59e0b',  // amber warning
        'chill-danger': '#ef4444',   // red danger
      },

      // ===== FONT FAMILY =====
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },

      // ===== BACKGROUND IMAGE =====
      backgroundImage: {
        // Cinema background untuk login & register
        'auth-cinema':
          "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80')",

        // Gradient overlays untuk Hero & popup
        'hero-overlay-bottom':
          'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 30%, transparent 100%)',
        'hero-overlay-left':
          'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 60%)',

        // Gradient untuk card
        'card-gradient':
          'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      },

      // ===== BOX SHADOW =====
      boxShadow: {
        'card': '0 25px 50px -12px rgba(0,0,0,0.9)',
        'menu': '0 10px 25px rgba(0,0,0,0.6)',
        'popup': '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)',
        'glow-indigo': '0 0 30px rgba(99, 102, 241, 0.5)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.15)',
      },

      // ===== BORDER RADIUS =====
      borderRadius: {
        'xl-2': '1rem',
        '2xl-2': '1.5rem',
        '3xl': '1.75rem',
      },

      // ===== ASPECT RATIO =====
      aspectRatio: {
        'poster': '2/3',
        'hero-mobile': '16/10',
        'hero-tablet': '16/9',
        'hero-desktop': '21/9',
        'video': '16/9',
      },

      // ===== SPACING (Extra) =====
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },

      // ===== KEYFRAMES =====
      keyframes: {
        // Fade animations
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },

        // Slide animations
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },

        // Scale animations
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },

        // Popup card expand
        'card-expand-popup': {
          '0%': {
            transform: 'scale(0.85) translateY(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1) translateY(0)',
            opacity: '1'
          },
        },

        // Bounce & pulse (untuk UI feedback)
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.7)'
          },
          '50%': {
            boxShadow: '0 0 0 15px rgba(99, 102, 241, 0)'
          },
        },

        // Shimmer effect (loading skeleton)
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },

        // Spin variations
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },

        // Ping variation (untuk notification badge)
        'ping-slow': {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0'
          },
        },
      },

      // ===== ANIMATIONS =====
      animation: {
        // Fade
        'fade-up': 'fade-up 0.6s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-down': 'fade-down 0.5s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',

        // Slide
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.4s ease-out',
        'slide-in-up': 'slide-in-up 0.5s ease-out',
        'slide-in-down': 'slide-in-down 0.5s ease-out',

        // Scale
        'scale-in': 'scale-in 0.3s ease-out',
        'scale-out': 'scale-out 0.3s ease-out',

        // Popup
        'card-expand-popup': 'card-expand-popup 0.4s cubic-bezier(0.16, 1, 0.3, 1)',

        // Effects
        'bounce-subtle': 'bounce-subtle 1s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },

      // ===== BACKDROP FILTER =====
      backdropBlur: {
        'xs': '2px',
      },

      // ===== Z-INDEX =====
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '200': '200',
      },

      // ===== TRANSITION =====
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },

      // ===== FONT SIZE (Extra small) =====
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],  // 10px
      },
    },
  },
  plugins: [
    // Plugin untuk line-clamp (jika belum default di Tailwind 3.3+)
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)',
        },
        '.text-shadow-md': {
          textShadow: '0 2px 4px rgba(0,0,0,0.6)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: '#4a4a4a',
          borderRadius: '3px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: '#6a6a6a',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}