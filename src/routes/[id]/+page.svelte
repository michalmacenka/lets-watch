<script lang="ts">
	import axios from 'axios';
	import { FastAverageColor } from 'fast-average-color';
	import { blur } from 'svelte/transition';
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	import { videoInfo } from '$core/store/writable';
	import Informations from '$lib/components/video/Informations.svelte';
	import Buttons from '$lib/components/video/Buttons.svelte';
	import animationVideoInformations from '$core/animations/videoInformations';

	export let data: PageData;
	$: $videoInfo = data.videoInfo;

	let img: HTMLImageElement;

	let mainColor = '';
	let isMainColorDark = false;

	let imgData = '';

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

	$: getImg($videoInfo.urlBg);

	onMount(animationVideoInformations);
</script>

<main class="w-full flex justify-between  ">
	{#if mainColor}
		<div
			transition:blur={{ duration: 500 }}
			style="background-color: {mainColor};"
			class="w-full h-full fixed {isMainColorDark
				? 'opacity-40'
				: 'opacity-[0.15]'}  top-0 left-0 -z-20 bg-gradient-to-r from-dark via-transparent"
		/>
	{/if}
	<div
		class="w-2/3 h-screen fixed top-0 right-0 -z-10 "
		style="-webkit-mask-image: linear-gradient(-80deg, black 0%, transparent 83%);"
	>
		{#if imgData}
			<img
				src="data:image/png;base64,{imgData}"
				alt="Video poster"
				transition:blur={{ duration: 500 }}
				class=" object-cover w-full h-full object-[0%] "
				bind:this={img}
				on:load={getColor}
			/>
		{/if}
	</div>

	<div class="text-light max-w-xl w-full infoSlide"><Informations /> <Buttons /></div>
</main>
