<script lang="ts">
	import type { VideoResult } from '$core/schemas/search';
	import { typeBgColor } from '$core/services/videoTypes';

	export let videoResult: VideoResult;
	const typeColor = typeBgColor(videoResult);
</script>

<li class="flex gap-2">
	<img
		src={videoResult.i.imageUrl}
		alt="poster thumbnail"
		class="object-cover h-16  w-12 rounded row-span-3"
	/>
	<div class="grid grid-cols-2 items-center  gap-2">
		<p>{videoResult.l}</p>
		<p class="text-middle text-sm ">{videoResult.yr || videoResult.y}</p>
		<span
			class=" {typeColor}  bg-opacity-50 w-fit  backdrop-blur capitalize rounded text-sm py-1 px-3 col-span-2  "
		>
			{videoResult.q}
		</span>
	</div>
</li>
