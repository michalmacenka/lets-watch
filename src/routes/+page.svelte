<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	import Searchbar from '$lib/components/searchbar/Main.svelte';
	import { popularVideos } from '$core/store/writable';
	import PopularVideo from '$lib/components/PopularVideo.svelte';
	import shuffleArray from '$core/helpers/shuffleArray';
	import animationPopularVideos from '$core/animations/popularVideos';
	import { allowedTypes } from '$core/store/readable';

	onMount(animationPopularVideos);

	export let data: PageData;
	$popularVideos = shuffleArray(data.popularVideos);
</script>

<main class="flex flex-col items-center sm:p-16 p-6 w-full gap-5 ">
	<h1 class="uppercase text-2xl font-bold tracking-widest z-20">
		Let's <span class="text-main ">Watch!</span>
	</h1>
	<Searchbar />

	<section class="w-full max-w-6xl mt-16">
		<div class="w-full dynamicColumns   ">
			{#each $popularVideos as video}
				{#if video.rating && $allowedTypes.includes(video.type.replace(/[-_ ]/g, '').toLowerCase())}
					<PopularVideo {video} />
				{/if}
			{/each}
		</div>
	</section>
	<section class="flex flex-col justify-center items-center w-full min-h-screen">
		<h1 class="text-3xl text-dark font-bold uppercase tracking-widest ">Could not choosed?</h1>
		<h2 class="text-main mt-2 ">Try to search anything you want!</h2>
	</section>
</main>
