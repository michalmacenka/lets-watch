<script lang="ts">
	import Lazy from 'svelte-lazy';

	import type * as SV from '$core/schemas/popularVideos';

	export let video: SV.Video = {
		title: '',
		idIMDB: '',
		urlPoster: '',
		type: '',
		year: 0,
		rating: 0
	};
</script>

<Lazy height={300}>
	<img src={video.urlPoster} alt="{video.title} poster" class="object-cover w-36  h-60" />
	<h1>{video.title}</h1>
</Lazy>
