<script lang="ts">
	import { videoInfo } from '$core/store/writable';
	import PlayType from './PlayType.svelte';
	import VideoSeason from './VideoSeason.svelte';
</script>

<div
	class="px-8 py-4 text-light  backdrop-blur bg-dark/70 w-full max-w-xs rounded-lg flex flex-col gap-1"
>
	{#each $videoInfo.seasons.reverse() as season}
		<VideoSeason {season} />
	{:else}
		<PlayType />
	{/each}
</div>
