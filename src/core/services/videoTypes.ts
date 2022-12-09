import type { VideoResult } from '$core/schemas/search';
import { get } from 'svelte/store';
import { videoType } from '$core/store/readable';

const typeBgColor = (videoResult: VideoResult) => {
	videoResult.q = (videoResult.q || '').toLowerCase();
	return get(videoType).find((o) => o.type.toLowerCase() === videoResult.q)?.bg;
};
export { typeBgColor };
