<script lang="ts">
	import { default as toWebVTT } from 'srt-webvtt';

	import { videoInfo, episodeInfo, videoLinks } from '$core/store/writable';
	import Button from '$lib/components/common/Button.svelte';

	let subtitlesFile: any;
	let uploadInput: HTMLElement;
</script>

<div
	class="px-8 py-4 text-light  backdrop-blur bg-dark/70 w-full max-w-xs rounded-lg flex flex-col gap-1"
>
	{#if $videoLinks.subtitles.length}
		<p>Download Subtitles</p>
		<ul class="ml-3 mb-3">
			{#each $videoLinks.subtitles as subtitles, i}
				<li class="text-light/60">
					{i + 1}.
					<a
						class="hover:text-main duration-150 ml-1"
						href={subtitles.src}
						download="{$videoInfo.title} s{('0' + $episodeInfo?.numSeason).slice(-2)}e{(
							'0' + $episodeInfo?.episode
						).slice(-2)} - {subtitles.label}.vtt"
					>
						{subtitles.label.length > 33 ? subtitles.label.slice(0, 30) + '...' : subtitles.label}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
	<input
		accept=".vtt,.srt"
		bind:files={subtitlesFile}
		bind:this={uploadInput}
		on:change={async () => {
			$videoLinks.subtitles = [
				...$videoLinks.subtitles,
				{
					src: await toWebVTT(subtitlesFile[0]),
					label: subtitlesFile[0].name
				}
			];
		}}
		type="file"
		id="subtitles"
		name="subtitles"
		class="hidden"
	/>
	<Button class="text-sm justify-center" on:click={() => uploadInput.click()}>
		<i class="ri-file-upload-line" />
		Upload own subtitles
	</Button>
</div>
