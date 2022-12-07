/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{svelte,html,js,ts}'],
	theme: {
		extend: {
			fontFamily: {
				title: '"Montserrat", sans-serif',
				body: '"Hind", sans-serif'
			},
			colors: {
				white: '#F6F7F7',
				black: '#101623',
        dark: '#1C2331',
				middle: '#4A5056',
				light: '#D0D4DA',
				main: '#FCC537',
			}
		}
	},
	plugins: []
};