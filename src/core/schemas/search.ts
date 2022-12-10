export interface VideoResult {
	i: {
		height: number;
		width: number;
		imageUrl: string;
	};
	id: string;
	l: string;
	y?: number;
	s: string;
	qid: string;
	rank?: number;
	q?: string;
	yr?: string;
}

export interface VideoType {
	title: string;
	q: string;
	bg: string;
}
