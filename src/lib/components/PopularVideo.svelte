<script lang="ts">
	import Lazy from 'svelte-lazy';

	import type * as SV from '$core/schemas/popularVideos';
	import { getType } from '$core/services/videoTypes';

	export let video: SV.Video;

	video.type = video.type.replace(/[-_]/g, ' ').toLowerCase();
	const type = getType(video.type.replaceAll(' ', ''));
</script>

<div class="w-full grid grid-cols-2 items-center popularVideo">
	<Lazy height={300} class="relative col-span-2 ">
		<span
			class="absolute {type.bg}  bg-opacity-50  backdrop-blur  capitalize rounded text-sm py-1 px-3 m-2  "
		>
			{type.title}
		</span>
		<img
			src={video.urlPoster}
			alt="{video.title} poster"
			class=" w-full rounded-md object-cover h-72   "
		/>
	</Lazy>

	<h3 class=" mt-3 text-white font-semibold col-span-2 ">{video.title}</h3>
	<p class="text-middle text-sm ">{video.year}</p>
	<div class="flex gap-1 justify-self-end  ">
		<i class="ri-star-s-fill text-main star backdrop-filter-[none]   -mt-1" />
		<p class="text-light text-sm ">{video.rating}</p>
	</div>
</div>

<style>
	.star {
		filter: drop-shadow(0 0 4px rgb(252 197 55 / 0.5));
	}
</style>
