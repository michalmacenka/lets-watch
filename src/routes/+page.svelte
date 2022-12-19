<script lang="ts">
	import { onMount } from 'svelte';

	import { popularVideos } from '$core/store/writable';
	import PopularVideo from '$lib/components/PopularVideo.svelte';
	import animationPopularVideos from '$core/animations/popularVideos';
	import { allowedTypes } from '$core/store/readable';

	onMount(animationPopularVideos);
</script>

<main class="flex flex-col items-center  gap-5 ">
	<section class="w-full max-w-6xl ">
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
