<script lang="ts">
	import humanizeDuration from 'humanize-duration';

	import { videoInfo } from '$core/store/writable';
	import { getType } from '$core/services/videoTypes';
	import type { VideoType } from '$core/schemas/search';

	$: $videoInfo.type = $videoInfo.type.replace(/[-_]/g, ' ').toLowerCase();
	let type: VideoType;
	$: type = getType($videoInfo.type.replaceAll(' ', ''));
</script>

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

<style>
	.stars i {
		@apply text-lg;
	}
</style>
