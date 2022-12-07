import axios from 'axios';

import type * as SV from '$core/schemas/popularVideos';

export default async (): Promise<SV.Video[]> => {
	try {
		const { data } = await axios({
			url: '/api/popular'
		});

		return data.data;
	} catch (err) {
		throw new Error('Error: ' + err);
	}
};
