import { readable, get } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type * as SS from '$core/schemas/search';

const videoType: Readable<SS.VideoType[]> = readable([
	{ title: 'Tv Series', q: 'tvseries', bg: 'bg-red-main' },
	{ title: 'Movie', q: 'movie', bg: 'bg-blue-main' },
	{ title: 'Tv Movie', q: 'tvmovie', bg: 'bg-purple-main' },
	{ title: 'Special', q: 'tvspecial', bg: 'bg-purple-main' },
	{ title: 'Tv Mini Series', q: 'tvminiseries', bg: 'bg-red-main' }
]);

const allowedTypes: Readable<string[]> = readable(get(videoType).map(({ q }) => q));

const searchTags: Readable<string[]> = readable(['titulky', 'tit', 'dabing', 'cz']);

export { videoType, allowedTypes, searchTags };
