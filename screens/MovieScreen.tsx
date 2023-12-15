import { useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/movie-screen/cast";
import MovieList from "../components/common/movie-list";
// import TopNavigation from "../components/common/top-navigation";
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

const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const {
    params: { id },
  } = useRoute();

  const { data, isLoading } = useSWR<MovieDetailType>(
    API.getMovieDetail(id, "movie"),
    fetcher
  );

  const { data: metaCastData } = useSWR<MetaCastListResponseType>(
    API.getDetailMeta(id, "credits", "movie"),
    fetcher
  );

  const { data: metaSimilarData } = useSWR<CommonResponse<MovieType[]>>(
    API.getDetailMeta(id, "similar", "movie"),
    fetcher
  );

  const { data: metaReviewsData } = useSWR<CommonResponse<ReviewType[]>>(
    API.getDetailMeta(id, "reviews", "movie"),
    fetcher
  );

  const { data: metaTrailerData } = useSWR<TrailerVideoListResponseType>(
    API.getDetailMeta(id, "videos", "movie"),
    fetcher
  );

  const castList = metaCastData?.cast ?? [];

  const trailerList = metaTrailerData?.results ?? [];

  const reviewsList = metaReviewsData?.results ?? [];

  const similarList: MovieType[] = metaSimilarData?.results ?? [];

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <View style={tw`flex-1 bg-neutral-900`}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* <TopNavigation /> */}
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
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.4, ...tw`absolute bottom-0` }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>
        <OverView data={data} />
        <TrailerList text="Trailer" data={trailerList} />
        <Cast text="Cast of the movie" data={castList} />
        <MovieList title="Similar movies" data={similarList} />
        <ReviewList data={reviewsList} />
      </ScrollView>
    </View>
  );
};

export default MovieScreen;
