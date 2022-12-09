<script lang="ts">
	import { videoType } from '$core/store/readable';
	import type { VideoResult } from '$core/schemas/search';

	export let videoResult: VideoResult;

	videoResult.q = (videoResult.q || 'video').toLowerCase();
	const typeBgColor =
		$videoType.find((o) => o.type.toLowerCase() === videoResult.q)?.bg || 'bg-purple-main';
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
			class=" {typeBgColor}  bg-opacity-50 w-fit  backdrop-blur capitalize rounded text-sm py-1 px-3 col-span-2  "
		>
			{videoResult.q}
		</span>
	</div>
</li>
