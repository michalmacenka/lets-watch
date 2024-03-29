<script lang="ts">
	import { page } from '$app/stores';
	import humanizeDuration from 'humanize-duration';
	import { fly } from 'svelte/transition';

	import { getVideoResults } from '$core/services/video';
	import { videoInfo, episodeInfo } from '$core/store/writable';
	import type * as SV from '$core/schemas/video';
	import OtherVideo from './OtherVideo.svelte';
	import Player from './Player.svelte';
	import EpisodeSwitch from './EpisodeSwitch.svelte';
	import DownloadBox from './DownloadBox.svelte';

	export let playTags: string[];

	let isMovie: boolean;

	let selectedVideoResult: SV.VideoResult;
	let data: { recommended: SV.VideoResult; other: SV.VideoResult[] };

	let videoResolution: number[] = [0];

	const search = async () => {
		let episode = $page.url.searchParams.get('e') || '';
		let season = $page.url.searchParams.get('s') || '';
		isMovie = episode.length === 0 && season.length === 0;
		episode = ('0' + episode).slice(-2);
		season = ('0' + season).slice(-2);
		if (!isMovie) {
			$episodeInfo = $videoInfo?.seasons[+season - 1]?.episodes[+episode - 1];
		}

		let series = !isMovie ? `s${season}e${episode}` : '';
		let term = `${$videoInfo.title} ${series} ${playTags.join(' ')}`;
		data = await getVideoResults(term, $videoInfo.duration, isMovie);
		selectedVideoResult = data.recommended;
	};

	const handleSelectVideo = (event: any) => {
		selectedVideoResult = event.detail.video;
	};
</script>

{#await search() then v}
	<div class="w-full mx-auto">
		<div class="lg:sticky top-32" in:fly={{ x: -30, duration: 300 }}>
			<a href="/{$videoInfo.idIMDB}" class="text-main">
				{$videoInfo.originalTitle}
			</a>
			<div class="text-2xl font-bold text-white -mt-1 md:flex gap-6">
				{#if !isMovie}
					<h1>
						s{('0' + $episodeInfo?.numSeason).slice(-2)}e{('0' + $episodeInfo?.episode).slice(-2)}
					</h1>
				{/if}

				<h1>
					{!isMovie ? $episodeInfo?.title : $videoInfo.originalTitle}
				</h1>
			</div>
		</div>
		<div class="w-full lg:grid grid-flow-col grid-cols-[5fr_3fr]  gap-8 ">
			<div class="lg:sticky top-5">
				<Player videoResult={selectedVideoResult} on:nextEpisode={search} bind:videoResolution />
				<div in:fly={{ x: -30, duration: 300 }}>
					<div class="sm:flex justify-between w-full items-start gap-3">
						<div>
							<h2 class="text-white font-medium">{selectedVideoResult.name}</h2>
							<div class="text-light sm:flex max-sm:my-3 items-center gap-3">
								{#if selectedVideoResult.hd && videoResolution[0]}
									<span class="text-red-main flex items-center gap-1">
										<i class="ri-hd-line -mt-1" />
										{#each videoResolution as res}
											<p>
												{res}p
											</p>
										{/each}
										<p />
									</span>
								{/if}
								<p class="grow">{humanizeDuration(selectedVideoResult.duration * 1000)}</p>
								<p>{selectedVideoResult.size}</p>
							</div>
						</div>
						{#if !isMovie}
							<EpisodeSwitch on:switchEpisode={search} />
						{/if}
					</div>
					<p class="mt-3 mb-6 text-light italic col-span-2">
						{!isMovie ? $episodeInfo?.plot : $videoInfo.description}
					</p>
					<DownloadBox />
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
