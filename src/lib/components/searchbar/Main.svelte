<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import axios from 'axios';

	import { popularVideos } from '$core/store/writable';
	import { initDelay } from '$core/helpers/fnDelay';
	import type { VideoResult } from '$core/schemas/search';
	import Result from './Result.svelte';
	import type { VideoResult } from '$core/schemas/search';
	import { filteredByTypes } from '$core/services/videoTypes';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';

	const placeholders = $popularVideos.map((video) => video.title);

	let input: HTMLElement;
	let inSearch = false;

	let term: string = '';
	let results: VideoResult[] = [];

	const suggestions = async () => {
		results = [];
		if (term === '') return;
		const { data } = await axios({
			url: '/api/suggestions/' + term
		});

		results = data.data;
	};
	$: results = filteredByTypes(results);

	const delay = initDelay(250);
</script>

{#if inSearch}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		transition:blur={{ duration: 100 }}
		class="fixed top-0 w-full h-screen bg-black/70 backdrop-blur-sm z-10"
	/>
{/if}
<form class="w-full max-w-lg relative">
	<div class="flex items-center w-full relative z-30">
		<div
			class:w-full={term.length === 0}
			class="absolute flex px-5 text-middle gap-5 items-center  -translate-y-[0.05rem] "
		>
			<button type="submit" class="flex items-center">
				<i class="ri-search-line " />
			</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if term.length === 0}
				<p
					class="w-full cursor-text translate-y-[0.1rem] flex items-center gap-1  cutText"
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
			{/if}
		</div>
		<div class="absolute right-0 -translate-y-[0.05rem]">
			<button
				on:click={() => {
					term = '';
					results = [];
				}}
				class="flex px-5 items-center"
			>
				<i
					class="ri-close-line cursor-pointer hover:text-light transition"
					class:hidden={term.length == 0}
				/>
			</button>
		</div>
		<input
			on:focusout={() => {
				inSearch = false;
				document.body.classList.remove('overflow-hidden');
			}}
			on:focus={() => {
				inSearch = true;
				document.body.classList.add('overflow-hidden');
			}}
			bind:this={input}
			bind:value={term}
			on:input={() => delay(suggestions)}
			type="text"
			class="pt-3.5  pb-3 px-14 text-white bg-dark rounded-lg w-full select-none"
		/>
	</div>
	{#if inSearch && results.length}
		<div class="absolute w-full z-20">
			<div
				transition:slide={{ y: -50, duration: 200 }}
				class="pt-6 pb-2.5 -mt-2 text-white bg-dark rounded-b-lg w-full relative"
			>
				<div class="w-[calc(100%-2.5rem)] mx-5 bg-middle/30 h-px absolute top-2" />
				<ul class="mt-2 flex flex-col   ">
					{#each results.slice(0, 4) as videoResult}
						<Result {videoResult} />
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</form>
