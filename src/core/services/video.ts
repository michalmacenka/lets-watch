import axios from 'axios';
import type * as SV from '$core/schemas/video';

const getVideoResults = async (
	term: string,
	duration: number,
	movie: boolean
): Promise<{ recommended: SV.VideoResult; other: SV.VideoResult[] }> => {
	try {
		const { data } = await axios({
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/search/',
			params: {
				term: term.trim(),
				duration,
				movie
			}
		});

		return data.data;
	} catch (err) {
		throw new Error('Error: ' + err);
	}
};

const getVideo = async (path: string, id: string, site: number): Promise<SV.Video> => {
	try {
		const { data } = await axios({
			method: 'POST',
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/video/',
			data: {
				path,
				id,
				site
			}
		});

		return data.data;
	} catch (err) {
		throw new Error('Error: ' + err);
	}
};

const getSubtitles = async (path: string, site: number): Promise<Blob> => {
	try {
		const { data } = await axios({
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/subtitles',
			responseType: 'blob',
			params: {
				src: site === 2 ? path.split('file/')[1] : path,
				site
			}
		});
		return data;
	} catch (err) {
		throw new Error('Error: ' + err);
	}
};

export { getVideo, getVideoResults, getSubtitles };
