import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';

const videoType: Readable<{ type: string; bg: string }[]> = readable([
	{ type: 'TV Series', bg: 'bg-red-main' },
	{ type: 'TV Episode', bg: 'bg-purple-main' },
	{ type: 'Video Game', bg: 'bg-purple-main' },
	{ type: 'TV Movie', bg: 'bg-blue-main' },
	{ type: 'TV Special', bg: 'bg-purple-main' },
	{ type: 'TV Mini Series', bg: 'bg-red-main' },
	{ type: 'Video', bg: 'bg-purple-main' },
	{ type: 'Movie', bg: 'bg-blue-main' }
]);

export { videoType };
