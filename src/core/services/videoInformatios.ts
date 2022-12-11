import axios from 'axios';
import type * as SI from '$core/schemas/videoInformations';

export default async (idIMDB: string): Promise<SI.VideoInfo> => {
	try {
		const { data } = await axios({
			baseURL: import.meta.env.VITE_LETSWATCH_API_URL,
			url: '/api/informations/' + idIMDB
		});

		return data.data;
	} catch (err) {
		throw new Error('Error: ' + err);
	}
};
