/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signin-gradient': 'linear-gradient(145deg, #5ebeff, #4e82fb)',
        'signup-gradient': 'linear-gradient(145deg,#65c86d,#2cbd9a)',
      },
    },
  },
  plugins: [],
}

