<script lang="ts">
	import { default as toWebVTT } from 'srt-webvtt';
	import type plyr from 'plyr';

	import { blur } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	import { getVideo, getSubtitles } from '$core/services/video';
	import type * as SV from '$core/schemas/video';
	import { videoLinks, episodeInfo, episodeSwitchData } from '$core/store/writable';

	import Plyr from './Plyr.svelte';

	const dispatch = createEventDispatcher();

	export let videoResult: SV.VideoResult;
	export let videoResolution: number[];

	let player: plyr;

	let playerVideos: { src: string; size: number }[] = [];
	let playerSubtitles: { src: string; label: string }[] = [];

	let isNextCtrl = false;

	const initSubtitles = async (src: string) => {
		return new Promise(async (resolve) => {
			resolve(await toWebVTT(await getSubtitles(src, videoResult.video.site)));
		});
	};

	const initVideo = async (v: SV.VideoResult) => {
		let videoData: SV.Video = await getVideo(v.video.path, v.video.id, v.video.site);
		if (videoData.subtitles.length) {
			if (v.video.site === 2) {
				videoData.subtitles[0].src = await toWebVTT(
					await getSubtitles(videoData.subtitles[0].src, videoResult.video.site)
				);

				videoData.subtitles[0].label = 'Subtitles';
			} else {
				for (const i in videoData.subtitles) {
					//@ts-ignore
					videoData.subtitles[i].src = await initSubtitles(videoData.subtitles[i].src);
				}
			}
		}

		playerVideos = videoData.video;
		playerSubtitles = videoData.subtitles;
		videoResolution = videoData.video.map(({ size }) => size);

		$videoLinks = videoData;
	};

	const nextEpisode = () => {
		if (!$episodeInfo) return;
		player.fullscreen.exit();
		$page.url.searchParams.set('s', $episodeSwitchData.nextSeason.toString());
		$page.url.searchParams.set('e', $episodeSwitchData.nextEpisode.toString());
		dispatch('nextEpisode');
		goto(`?${$page.url.searchParams.toString()}`, {
			noScroll: true
		});
		isNextCtrl = true;
	};

	$: initVideo(videoResult);
</script>

<div class="my-5" in:blur={{ duration: 500 }}>
	<!-- svelte-ignore a11y-media-has-caption -->
	{#if $videoLinks.video[0]}
		{#key $videoLinks.video}
			<Plyr on:ended={nextEpisode} bind:player {isNextCtrl}>
				{#each $videoLinks.video as { src, size }}
					<source {src} type="video/mp4" {size} />
				{/each}

				{#key $videoLinks.subtitles}
					{#each $videoLinks.subtitles as { src, label }, i}
						<track
							kind="captions"
							label={label.length > 23 ? label.slice(0, 20) + '...' : label}
							{src}
							srclang={i.toString()}
						/>
					{/each}
				{/key}
			</Plyr>
		{/key}
	{:else}
		<div
			class="flex items-center justify-center w-full gap-2 font-semibold text-light text-xl my-20"
			in:blur
		>
			<i class="ri-loader-4-line animate-spin" />
			<h2>Loading Video</h2>
		</div>
	{/if}
</div>

<style lang="scss">
	@use './Player';
</style>
