<script lang="ts">
	import Plyr from 'plyr';
	import 'plyr/dist/plyr.css';

	import { blur } from 'svelte/transition';
	import { onMount } from 'svelte';

	import { getVideo } from '$core/services/video';
	import type * as SV from '$core/schemas/video';
	import { videoInfo, episodeInfo } from '$core/store/writable';

	export let videoResult: SV.VideoResult;

	let player: any;

	const initVideo = async () => {
		const videoData: SV.Video = await getVideo(
			videoResult.video.path,
			videoResult.video.id,
			videoResult.video.site
		);

		player.source = {
			type: 'video',
			title: $episodeInfo.title,
			sources: videoData.video,
			tracks: videoData.subtitles
		};

		console.log(videoData);
	};

	onMount(() => {
		player = new Plyr('#player', { iconUrl: '/sprite.svg' });
		initVideo();
	});
</script>

<div class="my-5" in:blur={{ duration: 500 }}>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video id="player" controls playsinline />
</div>

<style lang="scss">
	@use './Player';
</style>
