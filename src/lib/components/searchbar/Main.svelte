<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import axios from 'axios';

	import { popularVideos } from '$core/store/writable';
	import Results from './Results.svelte';
	import { initDelay } from '$core/helpers/fnDelay';
	import type { VideoResult } from '$core/schemas/search';

	const placeholders = $popularVideos.map((video) => video.title);

	let input: HTMLElement;
	let inSearch = false;

	let term: string = '';
	let results: VideoResult[] = [];

	const suggestions = async () => {
		if (term === '') return;
		results = [];
		const { data } = await axios({
			url: '/api/suggestions/' + term
		});

		results = data.data;
	};
	const delay = initDelay(250);
</script>

<form class="w-full max-w-lg">
	<div class="flex items-center w-full relative">
		<div class="absolute flex w-full px-5 text-middle gap-5 items-center -translate-y-[0.05rem] ">
			<button type="submit" class="flex items-center">
				<i class="ri-search-line " />
			</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<p
				class:opacity-0={inSearch || term.length > 0}
				class="grow cursor-text translate-y-[0.1rem] flex items-center gap-1  cutText"
				on:click={() => input.focus()}
			>
				Let's watch
				<Typewriter
					mode="loopRandom"
					cursor={false}
					wordInterval={3000}
					unwriteInterval={30}
					interval={80}
				>
					{#each placeholders as text}
						<span>{text}</span>
					{/each}
				</Typewriter>
			</p>

			<button
				on:click={() => {
					term = '';
					results = [];
				}}
				class="flex items-center"
			>
				<i
					class="ri-close-line cursor-pointer hover:text-light transition"
					class:hidden={term.length == 0}
				/>
			</button>
		</div>
		<input
			on:focusout={() => (inSearch = false)}
			bind:this={input}
			bind:value={term}
			on:input={() => delay(suggestions)}
			type="text"
			class="pt-3.5  pb-3 px-14 text-white bg-dark rounded-lg w-full select-none"
		/>
	</div>
	{#if results.length}
		<Results {results} />
	{/if}
</form>
