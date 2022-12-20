<script lang="ts">
	import Lazy from 'svelte-lazy';

	import type * as SV from '$core/schemas/popularVideos';
	import { getType } from '$core/services/videoTypes';

	export let video: SV.Video;

	video.type = video.type.replace(/[-_]/g, ' ').toLowerCase();
	const type = getType(video.type.replaceAll(' ', ''));
</script>

<div class="popularVideo opacity-0 translate-y-10">
	<a
		data-sveltekit-preload-data="tap"
		href="/{video.idIMDB}"
		class="w-full grid grid-cols-2 items-start cursor-pointer duration-300 "
	>
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
			<p class="text-light text-sm ">{video.rating.toFixed(1)}</p>
		</div>
	</a>
</div>

<style>
	.popularVideo:hover a {
		@apply scale-105;
	}
</style>
