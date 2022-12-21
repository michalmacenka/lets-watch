<script lang="ts">
	import { slide } from 'svelte/transition';

	import type { EpisodeInfo } from '$core/schemas/videoInformations';
	import PlayType from './PlayType.svelte';

	export let episode: EpisodeInfo;

	let open = false;
</script>

<li class="leading-5 my-3  cursor-pointer duration-300 ">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<p
		on:click={() => {
			if (episode.title !== `Episode #${episode.numSeason}.${episode.episode}`) {
				open = !open;
			}
		}}
		class="hover:text-main text-light/60 "
	>
		{episode.numSeason}.{episode.episode} - {episode.title}
	</p>
	{#if open}
		<div class="p-2" transition:slide={{ duration: 200 }}>
			<PlayType season={episode.numSeason} episode={episode.episode} />
		</div>
	{/if}
</li>
