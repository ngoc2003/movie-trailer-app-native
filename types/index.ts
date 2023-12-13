export interface MovieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TvShowType {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: string[];
  id: number;
  name: string;
  origin_country: [];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface PeopleType {
  adult: boolean;
  gender: number;
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
export type CommonResponse<T> = {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
};
