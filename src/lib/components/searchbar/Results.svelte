<script lang="ts">
	import Result from './Result.svelte';
	import type { VideoResult } from '$core/schemas/search';
	import { allowedTypes } from '$core/store/readable';

	export let results: VideoResult[];

	const filteredResults = results.filter(
		({ qid, y, i }) => $allowedTypes.includes((qid || '').toLowerCase()) && y && qid && i
	);

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
