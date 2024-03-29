import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import type * as SP from '$core/schemas/popularVideos';
import type * as SI from '$core/schemas/videoInformations';
import type * as SV from '$core/schemas/video';

const popularVideos: Writable<SP.Video[]> = writable([]);

const videoInfo: Writable<SI.VideoInfo> = writable();

const episodeInfo: Writable<SI.EpisodeInfo> = writable();

const episodeSwitchData: Writable<{
	nextEpisode: number;
	nextSeason: number;
	previousEpisode: number;
	previousSeason: number;
}> = writable({
	nextEpisode: 2,
	nextSeason: 1,
	previousEpisode: 1,
	previousSeason: 1
});

const videoLinks: Writable<SV.Video> = writable({
	video: [],
	subtitles: []
});

export { popularVideos, videoInfo, episodeInfo, episodeSwitchData, videoLinks };
