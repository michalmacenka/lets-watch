<script lang="ts">
	import Plyr from 'plyr';
	import 'plyr/dist/plyr.css';
	import { default as toWebVTT } from 'srt-webvtt';

	import { blur } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { getVideo } from '$core/services/video';
	import type * as SV from '$core/schemas/video';
	import { videoInfo } from '$core/store/writable';

	export let videoResult: SV.VideoResult;

	let player: any;

	const initVideo = async (v: SV.VideoResult) => {
		const videoData: SV.Video = await getVideo(v.video.path, v.video.id, v.video.site);

		player.source = {
			type: 'video',
			title: $videoInfo.title,
			sources: videoData.video,
			tracks: videoData.subtitles
		};

		console.log(videoData);
	};

	onMount(() => {
		player = new Plyr('#player', { iconUrl: '/sprite.svg' });
	});
	$: initVideo(videoResult);
</script>

<div class="my-5" in:blur={{ duration: 500 }}>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video id="player" controls playsinline />
</div>

<style lang="scss">
	@use './Player';
</style>
