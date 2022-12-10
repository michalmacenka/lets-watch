<script lang="ts">
	import Result from './Result.svelte';
	import type { VideoResult } from '$core/schemas/search';
	import { filteredByTypes } from '$core/services/videoTypes';

	export let results: VideoResult[];

	const filteredResults = filteredByTypes(results);

	console.log(results);
	console.log(filteredResults);
</script>

<div class="pt-6 -mt-2 pb-4 px-5  text-white bg-dark rounded-b-lg w-full relative">
	<div class="w-[calc(100%-2.5rem)] bg-middle/30 h-px absolute top-2" />
	<ul class="mt-2 flex flex-col gap-5  ">
		{#each filteredResults.slice(0, 4) as videoResult}
			<Result {videoResult} />
		{/each}
	</ul>
</div>
