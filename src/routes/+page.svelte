<script lang="ts">
	import type { PageData } from './$types';

	import Searchbar from '$lib/components/searchbar/Main.svelte';
	import { popularVideos } from '$core/store/writable';
	import PopularVideo from '$lib/components/PopularVideo.svelte';
	import shuffleArray from '$core/helpers/shuffleArray';

	export let data: PageData;
	$popularVideos = shuffleArray(data.popularVideos);
</script>

<main class="flex flex-col items-center p-16 w-full gap-5 ">
	<h1 class="uppercase text-2xl font-bold tracking-widest ">
		Let's <span class="text-main ">Watch!</span>
	</h1>
	<Searchbar />

	<section class="w-full max-w-6xl mt-16">
		<div class="w-full columns   ">
			{#each $popularVideos as video}
				<PopularVideo {video} />
			{/each}
		</div>
	</section>
</main>

<style>
	.columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		grid-gap: 3em;
	}
</style>
