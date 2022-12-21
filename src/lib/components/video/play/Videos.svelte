<script lang="ts">
	import plyr from 'plyr';
	import { page } from '$app/stores';

	import { getVideoResults } from '$core/services/video';
	import { videoInfo } from '$core/store/writable';

	export let playType: string;

	const search = async () => {
		let episode = $page.url.searchParams.get('e') || '';
		let season = $page.url.searchParams.get('s') || '';
		episode = ('0' + episode).slice(-2);
		season = ('0' + season).slice(-2);
		let isMovie: boolean = episode.length === 0 && season.length === 0;
		playType =
			{
				all: '',
				subtitles: 'tit',
				czech: 'cz dab'
			}[playType] || '';

		let series = !isMovie ? `s${season}e${episode}` : '';
		let term = `${$videoInfo.title} ${series} ${playType}`;
		return await getVideoResults(term, $videoInfo.duration, isMovie);
	};
</script>

{#await search() then value}
	<p>{JSON.stringify(value)}</p>
{/await}
