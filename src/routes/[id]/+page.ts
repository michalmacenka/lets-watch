import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import getVideoInformatios from '$core/services/videoInformatios';
import type * as SI from '$core/schemas/videoInformations';

type OutputProps = {
	videoInfo: SI.VideoInfo;
};

export const load: PageLoad<OutputProps> = async ({ params }) => {
	try {
		const idIMDB = params.id;

		if (idIMDB.match(/tt[0-9]*/)) {
			const videoInfo: SI.VideoInfo = await getVideoInformatios(idIMDB);
			console.log(videoInfo);
			return { videoInfo };
		}
		throw error(404, 'not found');
	} catch (err) {
		throw error(404, 'Something happened');
	}
};
