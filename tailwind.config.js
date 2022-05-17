module.exports = {
  content: [
    './assets/**/*.{vue,js,ts,jsx,tsx}',
    './templates/**/*.{html,twig}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

//npx tailwindcss -i ./assets/styles/app.css -o ./public/build/app.css --watch
