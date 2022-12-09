import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';

const videoType: Readable<{ type: string; bg: string; text: string }[]> = readable([
	{ type: 'TV Series', bg: 'bg-red-main', text: 'text-red-main' },
	{ type: 'TV Episode', bg: 'bg-purple-main', text: 'text-purple-main' },
	{ type: 'TV Movie', bg: 'bg-blue-main', text: 'text-purple-main' },
	{ type: 'TV Special', bg: 'bg-purple-main', text: 'text-purple-main' },
	{ type: 'TV Mini Series', bg: 'bg-red-main', text: 'text-red-main' },
	{ type: 'Tv Mini-Series', bg: 'bg-red-main', text: 'text-red-main' },
	{ type: 'Movie', bg: 'bg-blue-main', text: 'text-blue-main' }
]);

export { videoType };
