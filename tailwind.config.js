/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/routes/**/*.svelte'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['emerald']
	}
};
