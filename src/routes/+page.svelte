<script lang="ts">
	import type { PageData } from './$types';

	import Searchbar from '$lib/components/searchbar/Main.svelte';
	export let data: PageData;
</script>

<main class="flex flex-col items-center p-16 w-full gap-5">
	<h1 class="uppercase text-2xl font-bold tracking-widest ">
		Let's <span class="text-main ">Watch!</span>
	</h1>
	<Searchbar />
	<pre>{JSON.stringify(data.popularVideos)}</pre>
</main>
