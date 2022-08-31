module.exports = {
  content: ['./assets/**/*.{vue,js,ts,jsx,tsx}', './templates/**/*.{html,twig}'],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

// npx tailwindcss -i ./assets/styles/app.css -o ./public/build/app.css --watch
