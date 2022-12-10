import { readable, get } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { VideoType } from '$core/schemas/search';

const videoType: Readable<VideoType[]> = readable([
	{ title: 'Tv Series', q: 'tvseries', bg: 'bg-red-main' },
	{ title: 'Movie', q: 'movie', bg: 'bg-blue-main' },
	{ title: 'Tv Movie', q: 'tvmovie', bg: 'bg-purple-main' },
	{ title: 'Special', q: 'tvspecial', bg: 'bg-purple-main' },
	{ title: 'Tv Mini Series', q: 'tvminiseries', bg: 'bg-red-main' }
]);

const allowedTypes: Readable<string[]> = readable(get(videoType).map(({ q }) => q));

export { videoType, allowedTypes };
