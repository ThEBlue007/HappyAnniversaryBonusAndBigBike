/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrapbook: {
          cream: '#fdfbf7',
          'cream-warm': '#faf4ea',
          beige: '#f4ece1',
          'beige-dark': '#e8ded0',
          pink: {
            50: '#fff5f7',
            100: '#ffe4e9',
            200: '#fccdd7',
            300: '#f8a5b7',
            400: '#f0718f',
            500: '#e2486f',
          },
          brown: {
            light: '#9e8979',
            DEFAULT: '#6b5444',
            dark: '#45352b',
            deep: '#30241c',
          },
          washi: {
            pink: 'rgba(255, 182, 193, 0.65)',
            yellow: 'rgba(254, 240, 138, 0.65)',
            blue: 'rgba(186, 230, 253, 0.65)',
            green: 'rgba(187, 247, 208, 0.65)',
            peach: 'rgba(254, 215, 170, 0.65)',
          }
        }
      },
      fontFamily: {
        hand: ['Caveat', 'Mali', 'cursive'],
        cute: ['Mali', 'cursive', 'sans-serif'],
        body: ['Itim', 'Mali', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'polaroid': '0 4px 15px -1px rgba(107, 84, 68, 0.12), 0 2px 6px -1px rgba(107, 84, 68, 0.08)',
        'polaroid-hover': '0 12px 28px -2px rgba(107, 84, 68, 0.18), 0 4px 12px -1px rgba(107, 84, 68, 0.1)',
        'envelope': '0 10px 25px -3px rgba(107, 84, 68, 0.15), 0 4px 10px -2px rgba(107, 84, 68, 0.08)',
        'letter': '0 15px 35px -5px rgba(107, 84, 68, 0.18), 0 6px 15px -3px rgba(107, 84, 68, 0.1)',
        'soft': '0 2px 10px rgba(107, 84, 68, 0.06)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
