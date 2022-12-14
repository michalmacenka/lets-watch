<script lang="ts">
	import axios from 'axios';
	import { FastAverageColor } from 'fast-average-color';

	import type { PageData } from './$types';
	import { videoInfo } from '$core/store/writable';

	export let data: PageData;
	$videoInfo = data.videoInfo;

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

<div style="background-color: {mainColor};" class="w-full h-40" />
{#await getImg() then data}
	<img src="data:image/png;base64,{data}" alt="Video poster" bind:this={img} on:load={getColor} />
{/await}
<pre>
  {JSON.stringify(data)}
</pre>
