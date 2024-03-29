<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import { blur, slide } from 'svelte/transition';
	import axios from 'axios';

	import { popularVideos } from '$core/store/writable';
	import { initDelay } from '$core/helpers/fnDelay';
	import type * as SS from '$core/schemas/search';
	import Result from './Result.svelte';
	import { filteredByTypes } from '$core/services/videoTypes';

	const placeholders = $popularVideos.map((video) => video.title);

	let input: HTMLElement;
	let inSearch = false;
	let searching = false;

	let term: string = '';
	let results: SS.VideoResult[] = [];

	const suggestions = async () => {
		results = [];
		if (term === '') return;
		searching = true;
		const { data } = await axios({
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/suggestions/' + term
		});
		searching = false;

		results = data.data;
	};
	$: results = filteredByTypes(results);

	const delay = initDelay(500);
</script>

{#if inSearch}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		transition:blur={{ duration: 100 }}
		class="fixed top-0 w-full h-screen bg-black/70 backdrop-blur-sm z-40"
	/>
{/if}
<div
	class="w-full max-w-lg relative"
	on:focusout={() => {
		inSearch = false;
		document.body.classList.remove('overflow-hidden');
	}}
	on:focusin={() => {
		inSearch = true;
		document.body.classList.add('overflow-hidden');
	}}
>
	<div class="flex items-center w-full relative z-50">
		<div
			class:w-full={term.length === 0}
			class:brightness-125={!inSearch}
			class="absolute flex px-5 text-light/50 gap-5 items-center z-40  -translate-y-[0.05rem]  "
		>
			<button type="submit" class="flex items-center">
				<i class="{searching ? 'ri-loader-4-line animate-spin' : 'ri-search-line'} " />
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
		<div class="absolute right-0 -translate-y-[0.05rem] z-40">
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
			bind:this={input}
			bind:value={term}
			on:input={() => delay(suggestions)}
			type="text"
			class="pt-3.5  pb-3 px-14 text-white {inSearch
				? 'bg-dark'
				: 'bg-middle/30 '}  rounded-lg backdrop-blur-lg  w-full select-none"
		/>
	</div>
	{#if inSearch && results.length}
		<div class="absolute w-full z-40">
			<div
				transition:slide={{ duration: 200 }}
				class="pt-6 pb-2.5 -mt-2 text-white bg-dark rounded-b-lg w-full relative"
			>
				<div class="w-[calc(100%-2.5rem)] mx-5 bg-middle/30 h-px absolute top-2" />
				<ul class="mt-2 flex flex-col   max-h-80  overflow-auto scrollbar">
					{#each results as videoResult}
						<Result
							{videoResult}
							on:click={() => {
								inSearch = false;
								term = '';
								document.body.classList.remove('overflow-hidden');
							}}
						/>
					{/each}
				</ul>
			</div>
			<p class="text-xs text-light/70 m-1 text-left ">*Not all suggestions can be played</p>
		</div>
	{/if}
</div>
