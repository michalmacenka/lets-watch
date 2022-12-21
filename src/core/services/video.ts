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
				term,
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
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/video/',
			params: {
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

export { getVideo, getVideoResults };