export interface Video {
	video: { path: string; label: string }[];
	subtitles: { path: string; label: string }[];
}

export interface VideoResult {
	name: string;
	video: {
		path: string;
		id: string;
		site: number;
	};
	duration: number;
	hd: boolean;
	size: string;
	rate: number;
}
