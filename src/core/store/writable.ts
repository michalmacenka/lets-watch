import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type * as SP from '$core/schemas/popularVideos';
import type * as SI from '$core/schemas/videoInformations';

const popularVideos: Writable<SP.Video[]> = writable([]);

const videoInfo: Writable<SI.VideoInfo> = writable();

export { popularVideos, videoInfo };
