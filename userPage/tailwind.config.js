export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#1f2937',
        'input-bg': '#2E3B4D',
        'white-text': '#e5e7eb',
        'light-2': '#9CA3AF',
        'primary-500': '#2563EB',
      },
        perspective: {
        1000: '1000px', 
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      rotate: {
        'y': 'rotateY(45deg)', 
      },
    },
  },
  plugins: [],
}
