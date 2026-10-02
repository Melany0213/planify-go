/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Misma paleta violeta del portafolio web (melany-portfolio), para
        // que ambos proyectos se reconozcan como parte de la misma marca.
        accent: {
          DEFAULT: '#7c3aed',
          soft: '#a78bfa',
          deep: '#5b21b6',
        },
        surface: {
          light: '#ffffff',
          dark: '#15102a',
        },
        bg: {
          light: '#f7f4fd',
          dark: '#0b0814',
        },
        ink: {
          light: '#191030',
          dark: '#f4f1ff',
        },
        muted: {
          light: '#5d5380',
          dark: '#a99fc7',
        },
      },
    },
  },
  plugins: [],
};
