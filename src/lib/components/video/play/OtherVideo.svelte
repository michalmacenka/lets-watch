<script lang="ts">
	import humanizeDuration from 'humanize-duration';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import type * as SV from '$core/schemas/video';

	export let video: SV.VideoResult;
	export let i: number;
	export let selected: boolean;

	const dispatch = createEventDispatcher();

	const selectVideo = () => {
		if (!selected) {
			dispatch('selectVideo', {
				video
			});
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li
	class="px-8 py-4 text-light backdrop-blur bg-dark/70 rounded-lg cursor-pointer"
	in:fly={{ x: 30, duration: 300, delay: i * 100 }}
	on:click={selectVideo}
>
	{#if selected}
		<p class="text-sm ">Now Playing</p>
	{/if}
	<h5 class="overflow-hidden {selected ? 'font-semibold text-main' : ''}">
		{video.name}
	</h5>

	<div class="text-middle flex items-center justify-between gap-2">
		<span class="flex gap-2 items-center">
			{#if video.hd}
				<i class="ri-hd-line text-red-main -mt-0.5" />
			{/if}
			<p>{humanizeDuration(video.duration * 1000)}</p>
		</span>
		<p>
			{video.size}
		</p>
	</div>
</li>

<style>
	li:hover h5 {
		@apply underline;
	}
</style>
