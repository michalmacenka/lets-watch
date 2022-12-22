<script lang="ts">
	import { page } from '$app/stores';
	import humanizeDuration from 'humanize-duration';
	import { blur, fly } from 'svelte/transition';

	import { getVideoResults } from '$core/services/video';
	import { videoInfo, episodeInfo } from '$core/store/writable';
	import type * as SV from '$core/schemas/video';
	import OtherVideo from './OtherVideo.svelte';
	import Player from './Player.svelte';

	export let playType: string;

	let isMovie: boolean;

	const search = async (): Promise<{ recommended: SV.VideoResult; other: SV.VideoResult[] }> => {
		let episode = $page.url.searchParams.get('e') || '';
		let season = $page.url.searchParams.get('s') || '';
		isMovie = episode.length === 0 && season.length === 0;
		episode = ('0' + episode).slice(-2);
		season = ('0' + season).slice(-2);
		if (!isMovie) {
			$episodeInfo = $videoInfo?.seasons[+season - 1]?.episodes[+episode - 1];
		}
		playType =
			{
				all: '',
				subtitles: 'tit',
				czech: 'cz dab'
			}[playType] || '';

		let series = !isMovie ? `s${season}e${episode}` : '';
		let term = `${$videoInfo.title} ${series} ${playType}`;
		const data = await getVideoResults(term, $videoInfo.duration, isMovie);
		return data;
	};
</script>

{#await search() then data}
	<div class="w-full  mx-auto">
		<div class="md:sticky top-14" in:fly={{ x: -30, duration: 300 }}>
			{#if !isMovie}
				<p class="text-main">
					s{('0' + $episodeInfo?.numSeason).slice(-2)}e{('0' + $episodeInfo?.episode).slice(-2)} -
					{$videoInfo.title}
				</p>
			{/if}

			<h1 class="text-2xl font-bold text-white -mt-1 ">
				{$episodeInfo?.title || $videoInfo.title}
			</h1>
		</div>
		<div class="w-full grid grid-flow-col grid-cols-[5fr_3fr]  gap-8 ">
			<div class="md:sticky top-24">
				<Player />
				<div in:fly={{ x: -30, duration: 300 }}>
					<h2>{data.recommended.name}</h2>
					<span class="text-middle flex items-center gap-2">
						{#if data.recommended.hd}
							<i class="ri-hd-line text-red-main" />
						{/if}
						<p>{humanizeDuration(data.recommended.duration * 1000)}</p>
					</span>
				</div>
			</div>
			<ul class="row-span-2 flex flex-col gap-3 max-h-full  mt-5">
				{#each data.other as video, i}
					<OtherVideo {video} {i} />
				{/each}
			</ul>
		</div>
	</div>
{:catch err}
	<h2 class="mx-auto text-light text-xl font-semibold">Error</h2>
{/await}
