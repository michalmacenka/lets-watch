<script lang="ts">
	//@ts-ignore
	import { Plyr } from 'svelte-plyr';
	import { default as toWebVTT } from 'srt-webvtt';

	import { blur } from 'svelte/transition';

	import { getVideo, getSubtitles } from '$core/services/video';
	import type * as SV from '$core/schemas/video';
	import { videoInfo } from '$core/store/writable';

	export let videoResult: SV.VideoResult;
	export let videoResolution: number[];

	let player: any;

	let playerVideos: { src: string; size: number }[] = [];
	let playerSubtitles: { src: string; label: string }[] = [];

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
	};

	$: initVideo(videoResult);
</script>

<div class="my-5" in:blur={{ duration: 500 }}>
	<!-- svelte-ignore a11y-media-has-caption -->
	{#if playerVideos[0]}
		{#key playerVideos}
			<Plyr
				bind:player
				options={{
					iconUrl: '/sprite.svg',
					blankVideo: '',
					captions: { update: true, active: true, language: 'auto' }
				}}
			>
				<video controls playsinline>
					{#each playerVideos as { src, size }}
						<source {src} type="video/mp4" {size} />
					{/each}

					{#each playerSubtitles as { src, label }}
						<track kind="captions" {label} {src} />
					{/each}
				</video>
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
