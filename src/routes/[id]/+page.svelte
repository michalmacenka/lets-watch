<script lang="ts">
	import axios from 'axios';
	import { FastAverageColor } from 'fast-average-color';
	import { blur, fly } from 'svelte/transition';

	import { page } from '$app/stores';

	import type { PageData } from './$types';
	import { videoInfo } from '$core/store/writable';
	import Informations from '$lib/components/video/Informations.svelte';
	import Buttons from '$lib/components/video/Buttons.svelte';
	import Playbox from '$lib/components/video/Playbox.svelte';
	import getVideoInformatios from '$core/services/videoInformatios';
	import Videos from '$lib/components/video/play/Videos.svelte';

	export let data: PageData;

	let pageStatus = 0;
	let playBox = false;
	let img: HTMLImageElement;
	let mainColor = '';
	let isMainColorDark = false;
	let imgData = '';
	let playType = '';
	let playPage = false;

	const fetch = async (id: string) => {
		try {
			imgData = '';
			mainColor = '';
			pageStatus = 0;
			$videoInfo = await getVideoInformatios(id);
			$videoInfo.seasons.reverse();
			pageStatus = 200;
			getImg($videoInfo.urlBg);
		} catch (err) {
			pageStatus = 500;
		}
	};

	const playSection = (type: string) => {
		playType = type;
		playPage = type === 'subtitles' || type === 'czech' || type === 'all';
	};

	const getColor = () => {
		const fac = new FastAverageColor();
		const color = fac.getColor(img);
		mainColor = color.hex;
		isMainColorDark = color.isDark;
	};

	const getImg = async (url: string) => {
		const { data } = await axios({
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/background?src=' + url
		});
		imgData = data;
	};

	$: fetch(data.idIMDB);
	$: playSection($page.url.searchParams.get('type') || '');
</script>

<main class="w-full md:flex justify-between items-start ">
	{#if mainColor}
		<div
			in:blur={{ duration: 500 }}
			style="background-color: {mainColor};"
			class="w-full h-full fixed {isMainColorDark
				? 'opacity-50'
				: 'opacity-30'}  top-0 left-0 -z-20 bg-gradient-to-r from-dark via-transparent "
		/>
	{/if}
	<div
		class="{!playPage
			? 'w-2/3'
			: 'w-full opacity-50'} h-screen fixed top-0 right-0 -z-10 duration-1000 ease-in-out "
		style={!playPage
			? '-webkit-mask-image: linear-gradient(-80deg, black 0%, transparent 83%);'
			: '-webkit-mask-image: linear-gradient(-90deg, black 0%, transparent 100%);'}
	>
		{#if imgData}
			<img
				src="data:image/png;base64,{imgData}"
				alt="Video poster"
				in:blur={{ duration: 500 }}
				class=" object-cover w-full h-full object-[0%] "
				bind:this={img}
				on:load={getColor}
			/>
		{/if}
	</div>

	{#if pageStatus === 200}
		{#if !playPage}
			<div
				class="text-light max-w-xl w-full md:sticky top-14"
				transition:fly={{ x: -30, duration: 300 }}
			>
				<Informations />
				<Buttons on:click={() => (playBox = !playBox)} />
			</div>
			{#if playBox}
				<div
					class="flex flex-col w-full md:place-items-end max-md:mt-24"
					transition:fly={{ x: 30, duration: 300 }}
				>
					<h3 class="text-4xl font-bold text-white mb-4">Find Video</h3>
					<Playbox />
				</div>
			{/if}
		{:else}
			<Videos {playType} />
		{/if}
	{:else if pageStatus === 0}
		<div
			class="flex items-center justify-center w-full gap-2 font-semibold text-middle text-xl "
			in:blur
		>
			<i class="ri-loader-4-line animate-spin" />
			<h2>Loading</h2>
		</div>
	{:else}
		<h2 class="mx-auto text-middle text-xl font-semibold">Error</h2>
	{/if}
</main>
