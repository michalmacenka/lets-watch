<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchTags } from '$core/store/readable';

	export let season: number = 0;
	export let episode: number = 0;

	let selectedTags: string[] = ['default'];

	const playVideo = () => {
		$page.url.searchParams.set('tags', selectedTags.join('-'));
		if (season > 0 && episode > 0) {
			$page.url.searchParams.set('s', season.toString());
			$page.url.searchParams.set('e', episode.toString());
		}
		goto(`?${$page.url.searchParams.toString()}`);
	};
</script>

<button class="submitBtn transition-all text-main my-3" on:click={playVideo}>
	<svg>
		<rect x="2" y="3" fill="none" width="98%" height="90%" rx="7" ry="7" />
	</svg>
	<i class="ri-stack-line  -mt-0.5 -ml-1" />
	Search video
</button>
<p class="text-light/30 text-xs -mb-1 mt-1 uppercase ">Search with tags...</p>
<div class=" flex flex-wrap text-sm items-start gap-2 mt-2">
	{#each $searchTags as tag}
		{@const isSelect = selectedTags.includes(tag)}
		<button
			class:text-main={isSelect}
			on:click={() => {
				!isSelect
					? (selectedTags = [...selectedTags, tag])
					: (selectedTags = selectedTags.filter((j) => j !== tag));
			}}>{tag}</button
		>
	{/each}
</div>

<style lang="scss">
	.submitBtn {
		@apply w-full rounded-lg relative flex items-center justify-center gap-2 font-medium leading-[46px];

		svg {
			@apply h-[46px] left-0 top-0 absolute w-full;
		}

		rect {
			@apply stroke-light/70 stroke-2;
			stroke-dasharray: 212, 0;
		}

		* {
			@apply transition-all duration-500;
			box-sizing: inherit;
		}

		&:hover {
			@apply bg-main/5;
			rect {
				stroke-dasharray: 35, 374;
				stroke-dashoffset: 48;
				transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
			}
		}
	}
</style>
