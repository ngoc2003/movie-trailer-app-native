import { useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/movie-screen/cast";
import MovieList from "../components/common/movie-list";
import tw from "twrnc";
import useSWR from "swr";
import { API, fetcher } from "../api";
import Loading from "../components/common/loading";
import {
  CommonResponse,
  MetaCastListResponseType,
  MovieDetailType,
  MovieType,
  ReviewType,
  TrailerVideoListResponseType,
} from "../types";
import ReviewList from "../components/common/review-list";
import TrailerList from "../components/common/trailer-list";
import OverView from "../components/movie-screen/overview";
import LayoutDefault from "../layouts";

const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const {
    params: { id },
  } = useRoute();

  const { data: metaTrailerData, isLoading: videoTrailerDataLoading } =
    useSWR<TrailerVideoListResponseType>(
      API.getDetailMeta(id, "videos", "movie"),
      fetcher
    );

  const { data, isLoading } = useSWR<MovieDetailType>(
    API.getMovieDetail(id, "movie"),
    fetcher
  );

  const { data: metaCastData, isLoading: metaCastLoading } =
    useSWR<MetaCastListResponseType>(
      API.getDetailMeta(id, "credits", "movie"),
      fetcher
    );

  const { data: metaSimilarData, isLoading: metaSimilarListLoading } = useSWR<
    CommonResponse<MovieType[]>
  >(API.getDetailMeta(id, "similar", "movie"), fetcher);

  const { data: metaReviewsData, isLoading: mataReviewLoading } = useSWR<
    CommonResponse<ReviewType[]>
  >(API.getDetailMeta(id, "reviews", "movie"), fetcher);

  const { data: recommendatoinsData, isLoading: recommendLoading } = useSWR<
    CommonResponse<MovieType[]>
  >(API.getRecommendationList(id), fetcher);

  const castList = metaCastData?.cast ?? [];

  const trailerList = metaTrailerData?.results ?? [];

  const reviewsList = metaReviewsData?.results ?? [];

  const similarList: MovieType[] = metaSimilarData?.results ?? [];

  const recommendationList: MovieType[] = recommendatoinsData?.results ?? [];

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <LayoutDefault>
      <View>
        <Image
          source={{
            uri: API.getImageUrl(data.poster_path),
          }}
          style={{ width, height: height * 0.6 }}
        />
        <LinearGradient
          colors={[
            "transparent",
            "rgba(23, 23, 23, 0.4)",
            "rgba(23, 23, 23, 6)",
          ]}
          style={{ width, height: height * 0.4, ...tw`absolute bottom-0` }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>
      <OverView data={data} />
      <TrailerList
        isLoading={videoTrailerDataLoading}
        text="Trailer"
        data={trailerList}
      />
      <Cast text="Cast of the movie" data={castList} />
      <MovieList
        isLoading={metaSimilarListLoading}
        title="Similar movies"
        data={similarList}
      />
      <MovieList
        isLoading={recommendLoading}
        title="Recommendations"
        data={recommendationList}
      />
      <ReviewList data={reviewsList} />
    </LayoutDefault>
  );
};

export default MovieScreen;
