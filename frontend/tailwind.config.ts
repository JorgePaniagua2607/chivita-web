import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        moss: {
          950: '#0D1912',
          900: '#16291E',
          800: '#213B2C',
          700: '#2F523E',
        },
        bark: {
          900: '#231710',
          800: '#38251A',
          700: '#523728',
        },
        fairy: {
          gold: '#D4AF37',
          glow: '#F3E5AB',
        },
        parchment: '#F7F4EB',
      },
    },
  },
  plugins: [],
};

export default config;
