/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        softBeige: '#F2E6D8',
        warmBeige: '#D9C8B4',
        sandBrown: '#A6937C',
        earthBrown: '#8C7C68',
        darkCharcoal: '#403C34',
      },
      backgroundImage: theme => ({
        hero: "url('/assets/bg/hero.jpg')",
        plans: "url('/assets/bg/plans.jpg')",
        offers: "url('/assets/bg/offers.jpg')",
        benefits: "url('/assets/bg/benefits.jpg')",
      }),
    },
  },
  plugins: [],
}
