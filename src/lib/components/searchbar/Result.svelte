<script lang="ts">
	import type * as SS from '$core/schemas/search';
	import { getType } from '$core/services/videoTypes';

	export let videoResult: SS.VideoResult;
	const type = getType(videoResult.qid.toLowerCase());
</script>

<li>
	<a
		on:click
		data-sveltekit-preload-data="tap"
		href="/{videoResult.id}"
		class="flex gap-2 items-start hover:bg-light/5 py-2.5 rounded-lg  transition-all px-5 "
	>
		<img
			src={videoResult.i.imageUrl}
			alt="poster thumbnail"
			class="object-cover h-16  w-12 rounded row-span-3"
		/>

		<div class="grow text-left ">
			<p class="">{videoResult.l}</p>
			<p class="text-middle text-sm mt-0.5  ">
				{videoResult.yr || videoResult.y}
			</p>
		</div>
		<span
			class=" {type.bg}  bg-opacity-50 w-fit   backdrop-blur capitalize rounded text-sm py-1 px-3 row-span-2   "
		>
			{type.title}
		</span>
	</a>
</li>
