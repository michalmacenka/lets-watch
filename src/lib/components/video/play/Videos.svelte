<script lang="ts">
	import { page } from '$app/stores';
	import humanizeDuration from 'humanize-duration';
	import { fly } from 'svelte/transition';

	import { getVideoResults } from '$core/services/video';
	import { videoInfo, episodeInfo } from '$core/store/writable';
	import type * as SV from '$core/schemas/video';
	import OtherVideo from './OtherVideo.svelte';
	import Player from './Player.svelte';

	export let playType: string;

	let isMovie: boolean;

	let selectedVideoResult: SV.VideoResult;

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
		selectedVideoResult = data.recommended;
		return data;
	};

	const handleSelectVideo = (event: any) => {
		selectedVideoResult = event.detail.video;
	};
</script>

{#await search() then data}
	<div class="w-full mx-auto">
		<div class="lg:sticky top-14" in:fly={{ x: -30, duration: 300 }}>
			{#if !isMovie}
				<p class="text-main">
					{$videoInfo.title}
				</p>
			{/if}

			<div class="text-2xl font-bold text-white -mt-1 md:flex gap-6">
				{#if !isMovie}
					<h1>
						s{('0' + $episodeInfo?.numSeason).slice(-2)}e{('0' + $episodeInfo?.episode).slice(-2)}
					</h1>
				{/if}

				<h1>
					{!isMovie ? $episodeInfo?.title : $videoInfo.title}
				</h1>
			</div>
		</div>
		<div class="w-full lg:grid grid-flow-col grid-cols-[5fr_3fr]  gap-8 ">
			<div class="lg:sticky top-24">
				<Player videoResult={selectedVideoResult} />
				<div in:fly={{ x: -30, duration: 300 }}>
					<h2 class="text-white font-medium">{selectedVideoResult.name}</h2>
					<span class="text-white flex items-center gap-2">
						{#if selectedVideoResult.hd}
							<i class="ri-hd-line text-red-main" />
						{/if}
						<p>{humanizeDuration(selectedVideoResult.duration * 1000)}</p>
					</span>
					<p class="mt-3 text-light italic ">
						{!isMovie ? $episodeInfo?.plot : $videoInfo.description}
					</p>
				</div>
			</div>
			<ul class="row-span-2 flex flex-col gap-3 max-h-full mt-14 lg:mt-5">
				<h2 class="text-white font-medium lg:text-right">Recommended</h2>
				<OtherVideo
					video={data.recommended}
					i={0}
					selected={data.recommended.video.id === selectedVideoResult.video.id}
					on:selectVideo={handleSelectVideo}
				/>
				<h2 class="text-white font-medium my-5 lg:text-right">Others</h2>
				{#each data.other as video, i}
					{#if video.video.id !== data.recommended.video.id}
						<OtherVideo
							{video}
							i={i + 1}
							selected={video.video.id === selectedVideoResult.video.id}
							on:selectVideo={handleSelectVideo}
						/>
					{/if}
				{:else}
					<h2 class="text-right text-light text-xl font-semibold">Nothing</h2>
				{/each}
			</ul>
		</div>
	</div>
{:catch err}
	<h2 class="mx-auto text-light text-xl font-semibold">Error</h2>
{/await}
