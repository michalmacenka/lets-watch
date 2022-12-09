<script lang="ts">
	import Result from './Result.svelte';
	import type { VideoResult } from '$core/schemas/search';
	import { videoType } from '$core/store/readable';

	const results: VideoResult[] = [
		{
			i: {
				height: 632,
				imageUrl:
					'https://m.media-amazon.com/images/M/MV5BMDc0ZGZmYzMtYTg3YS00MjNhLWI0MTItNTJiNDE5Njc5Y2ZkXkEyXkFqcGdeQXVyMTk2ODc0MjY@._V1_UX500_.jpg',
				width: 426
			},
			id: '/best-of',
			l: 'Best of 2022',
			s: 'Discover this year’s fan-favorite movies, TV series, stars, and more.'
		},
		{
			i: {
				height: 1350,
				imageUrl:
					'https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX100_.jpg',
				width: 1080
			},
			id: 'tt4574334',
			l: 'Stranger Things',
			q: 'TV series',
			qid: 'tvSeries',
			rank: 61,
			s: 'Millie Bobby Brown, Finn Wolfhard',
			y: 2016
		},
		{
			i: {
				height: 640,
				imageUrl:
					'https://m.media-amazon.com/images/M/MV5BNjY2NTkzODY0MV5BMl5BanBnXkFtZTgwNjk3NDA1OTE@._V1_.jpg',
				width: 480
			},
			id: 'tt1460534',
			l: 'Stranger Things',
			q: 'TV series',
			qid: 'tvSeries',
			rank: 37227,
			s: 'Adam Duckworth, Daniel Waller',
			y: 2008,
			yr: '2008-2009'
		},
		{
			i: {
				height: 1200,
				imageUrl:
					'https://m.media-amazon.com/images/M/MV5BMDRjYWI5NTMtZTYzZC00NTg4LWI3NjMtNmI3MTdhMWQ5MGJlXkEyXkFqcGdeQXVyNTg4MDc4Mg@@._V1_.jpg',
				width: 803
			},
			id: 'tt11225622',
			l: 'Stranger Things: Spotlight',
			q: 'TV series',
			qid: 'tvSeries',
			rank: 27952,
			s: '',
			y: 2018,
			yr: '2018-2018'
		},
		{
			i: {
				height: 1500,
				imageUrl:
					'https://m.media-amazon.com/images/M/MV5BNDAwNTdmZWMtMDIzMi00NDkyLWFhZWQtZGZhYTYzZmE3OWJmXkEyXkFqcGdeQXVyNzQ5MzY0NjM@._V1_.jpg',
				width: 1000
			},
			id: 'tt1468737',
			l: 'Stranger Things',
			q: 'feature',
			qid: 'movie',
			rank: 63434,
			s: 'Adeel Akhtar, Vivienne Burke',
			y: 2010
		},
		{
			i: {
				height: 597,
				imageUrl:
					'https://m.media-amazon.com/images/M/MV5BZDdhMzRiMmUtZjVlMi00OWE1LTliYmMtODM3MTk5ZTJkNDFhXkEyXkFqcGdeQXVyNjkyOTA1NjY@._V1_.jpg',
				width: 426
			},
			id: 'tt7570990',
			l: 'Beyond Stranger Things',
			q: 'TV series',
			qid: 'tvSeries',
			rank: 50037,
			s: 'Jim Rash, Matt Duffer',
			y: 2017,
			yr: '2017-2017'
		},
		{
			i: {
				height: 1080,
				imageUrl:
					'https://m.media-amazon.com/images/M/MV5BY2EyOWY3NjctMmMyMC00NjgwLWFlNGMtNjAwN2UxOTEyOWMyXkEyXkFqcGdeQXVyNTYwMTIzMTA@._V1_.jpg',
				width: 1920
			},
			id: 'tt23459408',
			l: 'Stranger Things 4: Trailer Drop Countdown',
			q: 'video',
			qid: 'video',
			rank: 68588,
			s: 'Sidnie J., Justin Nickolas',
			y: 2022
		},
		{
			i: {
				height: 1350,
				imageUrl:
					'https://m.media-amazon.com/images/M/MV5BNjE3ZjIxZTUtYzE0ZC00M2ZiLWE0MjAtZDViZGMyNjE5NjVkXkEyXkFqcGdeQXVyMjU5NDU0Mjc@._V1_.jpg',
				width: 1080
			},
			id: 'tt21222712',
			l: 'Geeked Week Unlocked: Stranger Things',
			q: 'TV mini-series',
			qid: 'tvMiniSeries',
			rank: 74711,
			s: 'Finn Wolfhard, Joseph Quinn',
			y: 2022,
			yr: '2022-2022'
		}
	];

	const allowedTypes = $videoType.map(({ type }) => type.toLowerCase());
	const filteredResults = results.filter(({ q }) => allowedTypes.includes((q || '').toLowerCase()));
</script>

<div class="pt-6 -mt-2 pb-4 px-5  text-white bg-dark rounded-b-lg w-full relative">
	<div class="w-[calc(100%-2.5rem)] bg-middle/30 h-px absolute top-2" />
	<ul class="mt-2 flex flex-col gap-5  ">
		{#each filteredResults.slice(0, 4) as videoResult}
			{#if videoResult.y && videoResult.q}
				<Result {videoResult} />
			{/if}
		{/each}
	</ul>
</div>
