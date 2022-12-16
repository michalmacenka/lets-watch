<script lang="ts">
	import axios from 'axios';
	import { FastAverageColor } from 'fast-average-color';
	import humanizeDuration from 'humanize-duration';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	//@ts-ignore
	import CopyToClipboard from 'svelte-copy-to-clipboard';

	import type { PageData } from './$types';
	import { videoInfo } from '$core/store/writable';
	import { getType } from '$core/services/videoTypes';
	import Button from '$lib/components/common/Button.svelte';

	export let data: PageData;
	$videoInfo = data.videoInfo;

	$videoInfo.type = $videoInfo.type.replace(/[-_]/g, ' ').toLowerCase();
	const type = getType($videoInfo.type.replaceAll(' ', ''));

	let img: HTMLImageElement;

	let mainColor = '';
	let isMainColorDark = false;

	let copyBtnText = 'Copy URL';
	let playDropdown = false;

	const getColor = () => {
		const fac = new FastAverageColor();
		const color = fac.getColor(img, { algorithm: 'dominant' });
		mainColor = color.hex;
		isMainColorDark = color.isDark;
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
		class="w-full h-full fixed {isMainColorDark
			? 'opacity-50'
			: 'opacity-10'}  saturate-150 top-0 left-0 -z-20"
	/>
	<div
		class="w-1/2 h-screen fixed top-0 right-0 -z-10"
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

	<div class="text-light max-w-xl w-full">
		<section>
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
		</section>
		<section class="mt-14 flex gap-4 items-start">
			<div
				class="w-full max-w-[8rem] "
				on:mouseenter={() => (playDropdown = true)}
				on:focusin={() => (playDropdown = true)}
				on:mouseleave={() => (playDropdown = false)}
				on:focusout={() => (playDropdown = false)}
			>
				<Button
					look="custom"
					class="w-full justify-center relative outline-none z-10 {playDropdown
						? 'bg-dark text-main'
						: 'bg-main  text-dark'}
				"><i class="ri-play-line -mt-0.5" /> Play</Button
				>
				{#if playDropdown}
					<ul
						transition:slide={{ duration: 200 }}
						class="bg-dark text-light  backdrop-filter backdrop-blur text-sm px-4 pb-3 pt-5  -mt-2  flex flex-col gap-2"
					>
						<li class="cursor-pointer hover:text-main  duration-300">
							<a href="#">with subtitles</a>
						</li>
						<li class="cursor-pointer hover:text-main  duration-300">
							<a href="#">with cz dabing</a>
						</li>
					</ul>
				{/if}
			</div>
			<a href={$videoInfo.urlIMDB} target="noreferrer">
				<Button>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="
					-mt-0.5"
						><path
							d="M13.646 10.237c-.057-.032-.16-.048-.313-.048v3.542c.201 0 .324-.041.371-.122s.07-.301.07-.66v-2.092c0-.244-.008-.4-.023-.469a.223.223 0 0 0-.105-.151zm3.499 1.182c-.082 0-.137.031-.162.091-.025.061-.037.214-.037.46v1.426c0 .237.014.389.041.456.029.066.086.1.168.1.086 0 .199-.035.225-.103.027-.069.039-.234.039-.495V11.97c0-.228-.014-.377-.043-.447-.032-.069-.147-.104-.231-.104z"
						/><path
							d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM6.631 14.663H5.229V9.266h1.402v5.397zm4.822 0H10.23l-.006-3.643-.49 3.643h-.875L8.342 11.1l-.004 3.563H7.111V9.266H8.93c.051.327.107.71.166 1.15l.201 1.371.324-2.521h1.832v5.397zm3.664-1.601c0 .484-.027.808-.072.97a.728.728 0 0 1-.238.383.996.996 0 0 1-.422.193c-.166.037-.418.055-.754.055h-1.699V9.266h1.047c.678 0 1.07.031 1.309.093.24.062.422.164.545.306.125.142.203.3.234.475.031.174.051.516.051 1.026v1.896zm3.654.362c0 .324-.023.565-.066.723a.757.757 0 0 1-.309.413.947.947 0 0 1-.572.174c-.158 0-.365-.035-.502-.104a1.144 1.144 0 0 1-.377-.312l-.088.344h-1.262V9.266h1.35v1.755a1.09 1.09 0 0 1 .375-.289c.137-.064.344-.096.504-.096.186 0 .348.029.484.087a.716.716 0 0 1 .44.549c.016.1.023.313.023.638v1.514z"
						/></svg
					>
					Database
				</Button>
			</a>
			<CopyToClipboard
				text={$page.url.href}
				on:copy={() => {
					copyBtnText = 'URL Copied';
					setTimeout(() => {
						copyBtnText = 'Copy URL';
					}, 4000);
				}}
				let:copy
			>
				<Button on:click={copy}><i class="ri-file-copy-line -mt-0.5" />{copyBtnText}</Button>
			</CopyToClipboard>
		</section>
	</div>
</main>

<style>
	.stars i {
		@apply text-lg;
	}
</style>
