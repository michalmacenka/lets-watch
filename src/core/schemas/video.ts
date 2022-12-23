export interface Video {
	video: { src: string; size?: string }[];
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
