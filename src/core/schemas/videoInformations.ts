interface EpisodeInfo {
	episode: number;
	season: number;
	idIMDB: string;
	title: string;
}

export interface SeasonInfo {
	season: number;
	episodes: EpisodeInfo[];
}

export interface VideoInfo {
	title: string;
	description: string;
	duration: number;
	genres: String[];
	seasons?: SeasonInfo[];
	rating: number;
	urlPoster: string;
	type: string;
	urlIMDB: string;
	year: number;
	endYear?: number;
}
