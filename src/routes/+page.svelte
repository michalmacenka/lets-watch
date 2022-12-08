<script lang="ts">
	import type { PageData } from './$types';

	import Searchbar from '$lib/components/searchbar/Main.svelte';
	import { popularVideos } from '$core/store/writable';
	import PopularVideo from '$lib/components/PopularVideo.svelte';

	export let data: PageData;
	$popularVideos = data.popularVideos;
</script>

<main class="flex flex-col items-center p-16 w-full gap-5">
	<h1 class="uppercase text-2xl font-bold tracking-widest ">
		Let's <span class="text-main ">Watch!</span>
	</h1>
	<Searchbar />

	<section>
		<!-- <h1 class="text-2xl">Popular Videos</h1> -->
		<div class="w-full max-w-6xl grid grid-cols-5 gap-5">
			{#each $popularVideos as video}
				<PopularVideo {video} />
			{/each}
		</div>
	</section>
</main>
