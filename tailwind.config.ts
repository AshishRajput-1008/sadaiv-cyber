import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans:    ['var(--font-body)', 'sans-serif'],
      heading: ['var(--font-ui)',   'sans-serif'],
      body:    ['var(--font-body)', 'sans-serif'],
      ui:      ['var(--font-ui)',   'sans-serif'],
      mono:    ['var(--font-mono)', 'monospace'],
      serif:   ['var(--font-body)', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}

export default config