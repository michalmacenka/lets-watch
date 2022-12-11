import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

import getVideoInformatios from '$core/services/videoInformatios';
import type * as SI from '$core/schemas/videoInformations';

type OutputProps = {
	videoInfo: SI.VideoInfo;
};

export const load: PageServerLoad<OutputProps> = async () => {
	try {
		const idIMDB = 'tt6264654'; //! For testing
		const videoInfo: SI.VideoInfo = await getVideoInformatios(idIMDB);
		return { videoInfo };
	} catch (err) {
		throw error(404, 'Not found');
	}
};
