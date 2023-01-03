<script lang="ts">
	import Plyr from 'plyr';
	import 'plyr/dist/plyr.css';
	import { default as toWebVTT } from 'srt-webvtt';

	import { blur } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { getVideo, getSubtitles } from '$core/services/video';
	import type * as SV from '$core/schemas/video';
	import { videoInfo } from '$core/store/writable';

	export let videoResult: SV.VideoResult;
	export let videoResolution: number[];

	let player: any;
	let playerElement: HTMLElement;

	const initVideo = async (v: SV.VideoResult) => {
		let videoData: SV.Video = await getVideo(v.video.path, v.video.id, v.video.site);
		if (videoData.subtitles.length) {
			if (v.video.site === 2) {
				videoData.subtitles[0].src = await toWebVTT(await getSubtitles(videoData.subtitles[0].src));
				videoData.subtitles[0].label = 'Subtitles';
			} else {
			}
		}
		player.source = {
			type: 'video',
			title: $videoInfo.title,
			sources: videoData.video,
			tracks: videoData.subtitles
		};
		videoResolution = videoData.video.map(({ size }) => size);
	};

	onMount(() => {
		player = new Plyr(playerElement, { iconUrl: '/sprite.svg' });
	});
	$: initVideo(videoResult);
</script>

<div class="my-5" in:blur={{ duration: 500 }}>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={playerElement} controls playsinline />
</div>

<style lang="scss">
	@use './Player';
</style>
