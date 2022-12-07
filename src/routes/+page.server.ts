import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import getPopularVideos from '$core/services/popularVideos';
import type * as SV from '$core/schemas/popularVideos';

type OutputProps = {
	popularVideos: SV.Video[];
};

export const load: PageServerLoad<OutputProps> = async () => {
	try {
		const popularVideos: SV.Video[] = await getPopularVideos();
		return { popularVideos };
	} catch (err) {
		throw error(404, 'Not found');
	}
};
