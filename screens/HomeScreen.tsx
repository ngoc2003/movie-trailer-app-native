import React from "react";
import TrendingMovies from "../components/common/trending-movies";
import MovieList from "../components/common/movie-list";
import useSWR from "swr";
import {
  CommonResponse,
  MovieType,
  TrendingPeopleType,
  TvShowType,
} from "../types";
import { API, fetcher } from "../api";
import TvShowList from "../components/common/tv-show-list";
import TrendingPeople from "../components/common/trending-people";
import LayoutDefault from "../layouts";

const HomeScreen = () => {
  const {
    data: topRatedList,
    // error,
    isLoading: topRatedLoading,
  } = useSWR<CommonResponse<MovieType[]>>(
    () => API.getMovieList("top_rated", 1, "movie"),
    fetcher
  );
  const {
    data: popularList,
    // error,
    isLoading: popularLoading,
  } = useSWR<CommonResponse<MovieType[]>>(
    () => API.getMovieList("now_playing", 1, "movie"),
    fetcher
  );

  const {
    data: tvList,
    // error,
    isLoading: tvListLoading,
  } = useSWR<CommonResponse<TvShowType[]>>(
    () => API.getMovieList("popular", 1, "tv"),
    fetcher
  );

  const {
    data: trendingPersonList,
    // error,
    isLoading: trendingPersonLoading,
  } = useSWR<CommonResponse<TrendingPeopleType[]>>(
    () => API.getTrendingList(),
    fetcher
  );

  const {
    data: animeList,
    // error,
    isLoading: animeLoading,
  } = useSWR<CommonResponse<MovieType[]>>(() => API.getAnimeList(), fetcher);

  const {
    data: horrorList,
    // error,
    isLoading: horrorLoading,
  } = useSWR<CommonResponse<MovieType[]>>(() => API.getHorrorList(), fetcher);

  const {
    data: animeEpisodeList,
    // error,
  } = useSWR<CommonResponse<TvShowType[]>>(
    () => API.getAnimeEpisodeList(),
    fetcher
  );

  return (
    <LayoutDefault>
      <TrendingMovies />
      <MovieList
        title="Top rated"
        isLoading={topRatedLoading}
        data={topRatedList?.results || []}
      />
      <MovieList
        title="Up coming"
        isLoading={popularLoading}
        data={popularList?.results || []}
      />
      <MovieList
        title="Anime"
        isLoading={animeLoading}
        data={animeList?.results || []}
      />
      <TvShowList
        title="Top Anime Series"
        data={animeEpisodeList?.results || []}
      />
      <TrendingPeople
        data={trendingPersonList?.results ? trendingPersonList?.results : []}
      />
      <TvShowList title="Top TV Show" data={tvList?.results || []} />
      <MovieList
        title="Horror"
        isLoading={horrorLoading}
        data={horrorList?.results || []}
      />
    </LayoutDefault>
  );
};

export default HomeScreen;
