<script lang="ts">
	import '../styles.scss';
	import 'remixicon/fonts/remixicon.css';
	import '$core/helpers/axiosInit';

	import type { PageData } from './$types';

	import Searchbar from '$lib/components/searchbar/Main.svelte';
	import shuffleArray from '$core/helpers/shuffleArray';
	import { popularVideos } from '$core/store/writable';

	export let data: PageData;
	$popularVideos = shuffleArray(data.popularVideos);
</script>

<div class="font-body text-white sm:px-16 px-6 sm:py-8 py-4 w-full">
	<header class="flex flex-col items-center  w-full gap-5 mb-16 ">
		<a href="/" class="z-50">
			<h1 class="uppercase text-xl font-bold tracking-widest ">
				Let's <span class="text-main ">Watch!</span>
			</h1>
		</a>
		<Searchbar />
	</header>
	<main class="w-full max-w-7xl mx-auto">
		<slot />
	</main>
</div>
