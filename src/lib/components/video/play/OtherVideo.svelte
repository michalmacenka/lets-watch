<script lang="ts">
	import humanizeDuration from 'humanize-duration';
	import { fly } from 'svelte/transition';

	import type * as SV from '$core/schemas/video';

	export let video: SV.VideoResult;
	export let i: number;
</script>

<li
	class="px-8 py-4 text-light  backdrop-blur bg-dark/70 rounded-lg cursor-pointer"
	in:fly={{ x: 30, duration: 300, delay: i * 100 }}
>
	<h5 class="col-span-2">{video.name}</h5>

	<span class="text-middle flex items-center gap-2">
		{#if video.hd}
			<i class="ri-hd-line text-red-main" />
		{/if}
		<p>{humanizeDuration(video.duration * 1000)}</p>
	</span>
</li>

<style>
	li:hover h5 {
		@apply underline;
	}
</style>
