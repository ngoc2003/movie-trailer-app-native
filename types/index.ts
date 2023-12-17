enum Gender {
  Male = 2,
  Female = 1,
}

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

export interface GenresDetailType {
  id: number;
  name: string;
}

export interface MovieDetailType extends MovieType {
  belongs_to_collection: string | null;
  budget: number;
  genres: GenresDetailType[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
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

export interface TrailerVideoType {
  id: string;
  iso_3166_1: string;
  iso_639_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: 1080;
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
