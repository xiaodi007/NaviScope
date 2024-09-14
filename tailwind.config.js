module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neonGreen: '#00ffff',
        neonBlue: '#00BFFF',
        darkBackground: '#0A0F1F',
      },
      backgroundOpacity: {
        70: '0.7',
        90: '0.9',
      },
    },
  },
  plugins: [],
};
