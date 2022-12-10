<script lang="ts">
	import type { VideoResult } from '$core/schemas/search';
	import { getType } from '$core/services/videoTypes';

	export let videoResult: VideoResult;
	const type = getType(videoResult.qid.toLowerCase());
</script>

<li class="flex gap-2">
	<img
		src={videoResult.i.imageUrl}
		alt="poster thumbnail"
		class="object-cover h-16  w-12 rounded row-span-3"
	/>
	<div class="grid grid-cols-2 items-start   gap-2">
		<p>{videoResult.l}</p>
		<p class="text-middle text-sm mt-0.5 ">{videoResult.yr || videoResult.y}</p>
		<span
			class=" {type.bg}  bg-opacity-50 w-fit  backdrop-blur capitalize rounded text-sm py-1 px-3 col-span-2  "
		>
			{type.title}
		</span>
	</div>
</li>
