<script lang="ts">
	import { slide } from 'svelte/transition';

	import type { SeasonInfo } from '$core/schemas/videoInformations';
	import VideoEpisode from './VideoEpisode.svelte';
	export let season: SeasonInfo;

	let open = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="flex items-center justify-between cursor-pointer hover:text-main duration-300 py-1"
	on:click={() => (open = !open)}
>
	<p class="font-medium">{season.season}. Season</p>
	<i class="ri-arrow-right-s-line" />
</div>
{#if open}
	<ul transition:slide={{ duration: 200 }}>
		{#each season.episodes as episode}
			<VideoEpisode {episode} />
		{/each}
	</ul>
{/if}
