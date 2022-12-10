import { get } from 'svelte/store';
import { allowedTypes, videoType } from '$core/store/readable';
import type { VideoResult, VideoType } from '$core/schemas/search';

const getType = (type: string): VideoType => {
	type = (type || '').toLowerCase();
	let finded = get(videoType).find((o) => o.q?.toLowerCase() === type);
	return finded || { title: '', q: '', bg: '' };
};

const filteredByTypes = (results: VideoResult[]): VideoResult[] => {
	let filtred = results.filter(
		({ qid, y, i }) =>
			get(allowedTypes).includes((qid || '').toLowerCase()) &&
			y &&
			qid &&
			i &&
			y <= new Date().getFullYear()
	);
	return filtred;
};

export { getType, filteredByTypes };
