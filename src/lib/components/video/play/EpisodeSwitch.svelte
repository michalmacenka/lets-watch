<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	import Button from '$lib/components/common/Button.svelte';
	import { videoInfo, episodeInfo } from '$core/store/writable';

	let nextEpisode: number;
	let nextSeason: number;

	let previousEpisode: number;
	let previousSeason: number;

	const dispatch = createEventDispatcher();

	const getNextEpisode = () => {
		if (
			$videoInfo.seasons[$episodeInfo.numSeason - 1].episodes.indexOf($episodeInfo) + 1 ===
				$videoInfo.seasons[$episodeInfo.numSeason - 1].episodes.length &&
			$videoInfo.seasons[$episodeInfo.numSeason]
		) {
			nextSeason = $episodeInfo.numSeason + 1;
			nextEpisode = $videoInfo.seasons[nextSeason].episodes[0].episode;
		} else if ($videoInfo.seasons[$episodeInfo.numSeason - 1].episodes[$episodeInfo.episode]) {
			nextSeason = $episodeInfo.numSeason;
			nextEpisode = $episodeInfo.episode + 1;
		} else {
			nextEpisode = 0;
			nextSeason = 0;
		}
	};

	const getPreviousEpisode = () => {
		if (
			$videoInfo.seasons[$episodeInfo.numSeason - 1].episodes.indexOf($episodeInfo) === 0 &&
			$videoInfo.seasons[$episodeInfo.numSeason - 1]
		) {
			previousSeason = $episodeInfo.numSeason - 1;
			previousEpisode =
				$videoInfo.seasons[previousSeason - 1].episodes[
					$videoInfo.seasons[previousSeason - 1].episodes.length - 1
				].episode;
		} else if ($videoInfo.seasons[$episodeInfo.numSeason - 1].episodes[$episodeInfo.episode - 1]) {
			previousSeason = $episodeInfo.numSeason;
			previousEpisode = $episodeInfo.episode - 1;
		} else {
			previousEpisode = 0;
			previousSeason = 0;
		}
	};

	const switchEpisode = (season: number, episode: number) => {
		$page.url.searchParams.set('s', season.toString());
		$page.url.searchParams.set('e', episode.toString());

		dispatch('switchEpisode');

		goto(`?${$page.url.searchParams.toString()}`, {
			noScroll: true
		});
	};

	$: if ($episodeInfo) {
		getNextEpisode();
		getPreviousEpisode();
	}
</script>

<section class="flex flex-wrap justify-end gap-2">
	{#if previousEpisode && previousSeason}
		<Button
			class="text-sm justify-center"
			on:click={() => switchEpisode(previousSeason, previousEpisode)}
		>
			<i class="ri-arrow-left-s-line" />
			s{('0' + previousSeason).slice(-2)}e{('0' + previousEpisode).slice(-2)}
		</Button>
	{/if}
	{#if nextEpisode && nextSeason}
		<Button class="text-sm justify-center" on:click={() => switchEpisode(nextSeason, nextEpisode)}>
			s{('0' + nextSeason).slice(-2)}e{('0' + nextEpisode).slice(-2)}
			<i class="ri-arrow-right-s-line " />
		</Button>
	{/if}
</section>
