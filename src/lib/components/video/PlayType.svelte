<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let season: number = 0;
	export let episode: number = 0;

	const playVideo = (type: string) => {
		$page.url.searchParams.set('type', type);
		if (season > 0 && episode > 0) {
			$page.url.searchParams.set('s', season.toString());
			$page.url.searchParams.set('e', episode.toString());
		}
		goto(`?${$page.url.searchParams.toString()}`);
	};
</script>

<div class="font-medium flex flex-col gap-1">
	<button on:click={() => playVideo('all')} class="flex gap-4 my-1">
		<i class="ri-stack-line text-main" />
		<p class="hover:text-main duration-300 cursor-pointer">All in one</p>
	</button>
	<p class="text-middle text-xs -mb-1 mt-1">BETA</p>
	<button on:click={() => playVideo('subtitles')} class="flex gap-4">
		<i class="ri-font-size text-red-main" />
		<p class="hover:text-red-main duration-300 cursor-pointer">with subtitles</p>
	</button>
	<button on:click={() => playVideo('czech')} class="flex gap-4">
		<i class="ri-flag-2-line text-green-main" />
		<p class="hover:text-green-main duration-300 cursor-pointer">in Czech</p>
	</button>
</div>
