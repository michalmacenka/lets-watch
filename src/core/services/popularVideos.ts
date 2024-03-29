import axios from 'axios';

import type * as SP from '$core/schemas/popularVideos';

export default async (): Promise<SP.Video[]> => {
	try {
		const { data } = await axios({
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/popular'
		});

		return data.data;
	} catch (err) {
		throw new Error('Error: ' + err);
	}
};
