import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Video } from '$core/schemas/popularVideos';

const popularVideos: Writable<Video[]> = writable([]);

export { popularVideos };
