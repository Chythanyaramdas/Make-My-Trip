/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',
  
        'node_modules/flowbite-react/lib/esm/**/*.js}'
],
  theme: {
    extend: {
      backgroundImage: {
        'login-signup': "url('https://res.cloudinary.com/dsyln8j3g/image/upload/v1687606220/hermansyah-7uXn7nudorc-unsplash_1_udk8xq.jpg')",
        
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
],
}

