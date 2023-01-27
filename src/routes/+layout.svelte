<script lang="ts">
	import '../styles.scss';
	import 'remixicon/fonts/remixicon.css';
	import '$core/helpers/axiosInit';

	import type { PageData } from './$types';

	import Searchbar from '$lib/components/searchbar/Main.svelte';
	import shuffleArray from '$core/helpers/shuffleArray';
	import { popularVideos } from '$core/store/writable';
	import Cookies from '$lib/components/common/Cookies.svelte';

	export let data: PageData;
	$popularVideos = shuffleArray(data.popularVideos);
</script>

<Cookies />
<div class="font-body text-white sm:px-16 px-6 sm:py-8 py-4 w-full">
	<div class="absolute top-0 left-0  m-3">
		<a
			href="https://github.com/michalmacenka/lets-watch"
			target="noreferrer"
			class="text-light hover:text-main transition-all text-left flex gap-2 items-center whitespace-nowrap "
		>
			<i class="ri-github-fill scale-125" />
			<h2 class="text-xs sm:flex items-center ">
				Dev. by <span class="flex items-center">
					<img src="/mm.png" alt="Michal Mačenka logo" class="h-6 sm:ml-2 mr-1" /> Michal Mačenka</span
				>
			</h2>
		</a>
	</div>
	<a
		href="/terms"
		class="text-light hover:text-main transition-all text-right absolute top-0 right-0 m-3">Terms</a
	>
	<header class="flex flex-col items-center text-center max-sm:mt-16  w-full gap-5 mb-16 ">
		<a href="/" class="z-50 relative">
			<h3 class="absolute -top-3 -left-1 text-sm text-main font-semibold">BETA</h3>
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
<img
	src="/bg.jpg"
	alt="background"
	class="w-full bg-cover h-full fixed top-0 mix-blend-screen opacity-25 -z-50  "
/>
