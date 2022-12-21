import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

type OutputProps = {
	idIMDB: string;
};

export const load: PageLoad<OutputProps> = async ({ params }) => {
	try {
		const idIMDB = params.id;

		if (idIMDB.match(/^tt[0-9]*$/)) {
			return { idIMDB };
		}
		throw error(404, 'Not found');
	} catch (err) {
		throw error(404, 'Something happened');
	}
};
