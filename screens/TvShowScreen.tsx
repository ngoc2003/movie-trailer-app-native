import { useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/movie-screen/cast";
import tw from "twrnc";
import useSWR from "swr";
import { API, fetcher } from "../api";
import Loading from "../components/common/loading";
import {
  CommonResponse,
  MetaCastListResponseType,
  ReviewType,
  TrailerVideoListResponseType,
  TvShowDetailType,
  TvShowType,
} from "../types";
import ReviewList from "../components/common/review-list";
import TrailerList from "../components/common/trailer-list";
import LayoutDefault from "../layouts";
import TvShowOverview from "../components/tv-show-screen/tvshow-overview";
import SeasonList from "../components/tv-show-screen/season-list";
import TvShowList from "../components/common/tv-show-list";

const { width, height } = Dimensions.get("window");

const TvShowScreen = () => {
  const {
    params: { id },
  } = useRoute();

  const { data: metaTrailerData, isLoading: videoTrailerDataLoading } =
    useSWR<TrailerVideoListResponseType>(
      API.getDetailMeta(id, "videos", "movie"),
      fetcher
    );

  const { data, isLoading } = useSWR<TvShowDetailType>(
    API.getDetail(id, "tv"),
    fetcher
  );

  const { data: metaCastData } = useSWR<MetaCastListResponseType>(
    API.getDetailMeta(id, "credits", "tv"),
    fetcher
  );

  const { data: metaSimilarData } = useSWR<CommonResponse<TvShowType[]>>(
    API.getDetailMeta(id, "similar", "tv"),
    fetcher
  );

  const { data: metaReviewsData } = useSWR<CommonResponse<ReviewType[]>>(
    API.getDetailMeta(id, "reviews", "tv"),
    fetcher
  );

  const { data: recommendatoinsData } = useSWR<CommonResponse<TvShowType[]>>(
    API.getRecommendationList(id, "tv"),
    fetcher
  );

  const castList = metaCastData?.cast ?? [];

  const trailerList = metaTrailerData?.results ?? [];

  const reviewsList = metaReviewsData?.results ?? [];

  const similarList: TvShowType[] = metaSimilarData?.results ?? [];

  const recommendationList: TvShowType[] = recommendatoinsData?.results ?? [];

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
      <TvShowOverview data={data} />
      <SeasonList seriesId={id} seasons={data?.seasons ?? []} />
      <TvShowList title="Recommendation" data={recommendationList} />
      <TvShowList title="Similar tv show" data={similarList} />
      <TrailerList
        isLoading={videoTrailerDataLoading}
        text="Trailer"
        data={trailerList}
      />
      <Cast text="Cast of the tv show" data={castList} />

      <ReviewList data={reviewsList} />
    </LayoutDefault>
  );
};

export default TvShowScreen;
