enum Gender {
  Male = 2,
  Female = 1,
}

export interface GenresDetailType {
  id: number;
  name: string;
}

export interface ProductionCompanyType {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountryType {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CommonType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface MovieType extends CommonType {
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  original_title: string;
}

export interface TvShowType extends CommonType {
  name: string;
  first_air_date: string;
  origin_country: string[];
  original_name: string;
  poster_path: string;
}

export interface MovieDetailType extends MovieType {
  belongs_to_collection: string | null;
  budget: number;
  genres: GenresDetailType[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompanyType[];
  production_countries: ProductionCountryType[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}

export interface TrailerVideoType {
  id: string;
  iso_3166_1: string;
  iso_639_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string; //default Clip
}

export interface CastType {
  adult: false;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface TrailerVideoListResponseType {
  id: string;
  results: TrailerVideoType[];
}

export interface MetaCastListResponseType {
  id: string;
  cast: CastType[];
}

export interface PeopleType {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: string | null;
  name: string;
  popularity: number;
  profile_path: string | null;
}

interface KnownForType extends MovieType {
  poster_path: string;
  media_type: string;
}

export interface TrendingPeopleType extends PeopleType {
  original_name: string;
  media_type: string;
  known_for: KnownForType[];
}
export interface ReviewType {
  author: string;
  author_details: {
    avatar_path: string;
    name: string;
    rating: number;
    username: string;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export type CommonResponse<T> = {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
};

export interface SeasonType {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface TvShowDetailType extends Omit<TvShowType, "origin_country"> {
  created_by: {
    credit_id: string;
    gender: Gender;
    id: number;
    name: string;
    profile_path: string;
  }[];
  episode_run_time: [42];
  genres: GenresDetailType[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  next_episode_to_air: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  production_companies: ProductionCompanyType[];
  production_countries: ProductionCountryType[];
  seasons: SeasonType[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
}

export interface ListEpisodeResponse {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  _id: string;
  air_date: string | null;
  episodes: EpisodeType[];
}

export interface CrewType {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: Gender;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface GuestStarType {
  adult: boolean;
  character: string;
  credit_id: string;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface EpisodeType {
  air_date: string | null;
  crew: CrewType[];
  episode_number: number;
  episode_type: string;
  guest_stars: GuestStarType[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}
