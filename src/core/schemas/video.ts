export interface Video {
	video: { src: string; size: number }[];
	subtitles: { src: string; label: string }[];
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
