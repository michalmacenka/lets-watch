export interface EpisodeInfo {
	episode: number;
	numSeason: number;
	idIMDB: string;
	title: string;
	plot: string;
}

export interface SeasonInfo {
	season: number;
	episodes: EpisodeInfo[];
}

export interface VideoInfo {
	title: string;
	originalTitle: string;
	description: string;
	duration: number;
	genres: String[];
	seasons: SeasonInfo[];
	rating: number;
	urlPoster: string;
	type: string;
	urlIMDB: string;
	urlBg: string;
	year: number;
	endYear?: number;
	idIMDB: string;
}
