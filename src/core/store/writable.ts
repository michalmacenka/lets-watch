import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type * as SV from '$core/schemas/popularVideos';

const popularVideos: Writable<SV.Video[]> = writable([]);

export { popularVideos };
