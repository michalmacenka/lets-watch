import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(
		preprocess({
			postcss: true
		})
	),

	kit: {
		adapter: adapter(),
		alias: {
			$lib: resolve('./src/lib/'),
			$components: resolve('./src/lib/components/'),
			$core: resolve('./src/core/')
		}
	}
};

export default config;
