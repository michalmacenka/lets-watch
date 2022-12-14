<script lang="ts">
	import axios from 'axios';
	import { FastAverageColor } from 'fast-average-color';
	import humanizeDuration from 'humanize-duration';

	import type { PageData } from './$types';
	import { videoInfo } from '$core/store/writable';
	import { getType } from '$core/services/videoTypes';

	export let data: PageData;
	$videoInfo = data.videoInfo;

	$videoInfo.type = $videoInfo.type.replace(/[-_]/g, ' ').toLowerCase();
	const type = getType($videoInfo.type.replaceAll(' ', ''));

	let img: HTMLImageElement;

	let mainColor = '';

	const getColor = () => {
		const fac = new FastAverageColor();
		const color = fac.getColor(img, { algorithm: 'dominant' });
		mainColor = color.hex;
	};

	const getImg = async () => {
		const { data } = await axios({
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/background?src=' + $videoInfo.urlBg
		});
		return data;
	};
</script>

<main class="h-screen w-full flex justify-between px-24 py-12 ">
	<div
		style="background-color: {mainColor};"
		class="w-full h-full fixed opacity-10 saturate-150 top-0 left-0 -z-20"
	/>

	<div class="text-light max-w-xl w-full">
		<h1 class="text-4xl font-bold text-white  ">{$videoInfo.title}</h1>
		<div class="flex items-center gap-6 mt-0.5 font-medium">
			<p>
				{humanizeDuration($videoInfo.duration * 1000)}
			</p>
			<figure class="flex text-light items-center  ">
				<figcaption>
					{$videoInfo.rating.toFixed(1)}
				</figcaption>
				<div class="stars relative transform scale-75 -mt-0.5  text-main ">
					<div
						class="absolute left-0 top-0 overflow-hidden flex gap-0.5"
						style="width: {Math.round(($videoInfo.rating /= Math.pow(10, -1)))}%"
					>
						{#each Array(5) as o}
							<i class="ri-star-fill star" />
						{/each}
					</div>
					<div class="flex gap-0.5 opacity-60">
						{#each Array(5) as o}
							<i class="ri-star-line" />
						{/each}
					</div>
				</div>
			</figure>
		</div>
		<p class="w-full max-w-xl  text-light/50 my-5">{$videoInfo.description}</p>

		<ul class="flex gap-2 ">
			<li class=" {type.bg}  bg-opacity-50  backdrop-blur  capitalize rounded  py-1 px-3 mr-6 ">
				{type.title}
			</li>
			{#each $videoInfo.genres as genre}
				<li class=" backdrop-blur bg-middle/50 rounded  py-1 px-3  ">
					{genre}
				</li>
			{/each}
		</ul>
	</div>

	<div
		class="w-1/2 h-screen fixed top-0 right-0"
		style=" -webkit-mask-image:-webkit-gradient(linear, right top, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))"
	>
		{#await getImg() then data}
			<img
				src="data:image/png;base64,{data}"
				alt="Video poster"
				class=" object-cover w-full h-full object-[40%]"
				bind:this={img}
				on:load={getColor}
			/>
		{/await}
	</div>
</main>

<style>
	.stars i {
		@apply text-lg;
	}
</style>
