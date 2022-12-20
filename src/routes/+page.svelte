<script lang="ts">
	import { onMount } from 'svelte';

	import { popularVideos } from '$core/store/writable';
	import PopularVideo from '$lib/components/PopularVideo.svelte';
	import animationPopularVideos from '$core/animations/popularVideos';
	import { allowedTypes } from '$core/store/readable';

	onMount(animationPopularVideos);
</script>

<section class="w-full dynamicColumns   ">
	{#each $popularVideos as video}
		{#if video.rating && $allowedTypes.includes(video.type.replace(/[-_ ]/g, '').toLowerCase())}
			<PopularVideo {video} />
		{/if}
	{/each}
</section>
