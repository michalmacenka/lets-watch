import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type * as SP from '$core/schemas/popularVideos';

const popularVideos: Writable<SP.Video[]> = writable([]);

export { popularVideos };
