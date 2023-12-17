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
import TvShowOverview from "../components/tv-show-screen/tvshow-overview";
import SeasonList from "../components/tv-show-screen/season-list";

const { width, height } = Dimensions.get("window");
// {
//     "adult":false,
//     "backdrop_path":"/oOce9hLMVFubjAJliau4kiSNPnW.jpg",
//     "created_by":[
//        {
//           "credit_id":"5253851c19c2957940204dd0",
//           "gender":2,
//           "id":117443,
//           "name":"Dick Wolf",
//           "profile_path":"/tRMEuYNVFjXYJ7gh1sGJSxq9Vwq.jpg"
//        }
//     ],
//     "episode_run_time":[
//        42
//     ],
//     "first_air_date":"1990-09-13",
//     "genres":[
//        {
//           "id":80,
//           "name":"Crime"
//        },
//        {
//           "id":18,
//           "name":"Drama"
//        }
//     ],
//     "homepage":"http://www.nbc.com/law-order",
//     "id":549,
//     "in_production":true,
//     "languages":[
//        "en"
//     ],
//     "last_air_date":"2023-05-18",
//     "last_episode_to_air":{
//        "air_date":"2023-05-18",
//        "episode_number":22,
//        "episode_type":"finale",
//        "id":4358259,
//        "name":"Open Wounds",
//        "overview":"When a senator is gunned down at his daughter’s wedding, McCoy pushes for a severe sentence and squares up against a formidable defense attorney — his own daughter. Price aims to stay neutral but can’t help but empathize with the defendant over a shared trauma.",
//        "production_code":"",
//        "runtime":null,
//        "season_number":22,
//        "show_id":549,
//        "still_path":"/2VVoBy4sitPSftiD4DsugVHDoBx.jpg",
//        "vote_average":7.3,
//        "vote_count":3
//     },
//     "name":"Law & Order",
//     "networks":[
//        {
//           "id":6,
//           "logo_path":"/cm111bsDVlYaC1foL0itvEI4yLG.png",
//           "name":"NBC",
//           "origin_country":"US"
//        }
//     ],
//     "next_episode_to_air":{
//        "air_date":"2024-01-18",
//        "episode_number":1,
//        "episode_type":"standard",
//        "id":4937312,
//        "name":"Episode 1",
//        "overview":"",
//        "production_code":"",
//        "runtime":null,
//        "season_number":23,
//        "show_id":549,
//        "still_path":null,
//        "vote_average":0,
//        "vote_count":0
//     },
//     "number_of_episodes":489,
//     "number_of_seasons":23,
//     "origin_country":[
//        "US"
//     ],
//     "original_language":"en",
//     "original_name":"Law & Order",
//     "overview":"In cases ripped from the headlines, police investigate serious and often deadly crimes, weighing the evidence and questioning the suspects until someone is taken into custody. The district attorney's office then builds a case to convict the perpetrator by proving the person guilty beyond a reasonable doubt. Working together, these expert teams navigate all sides of the complex criminal justice system to make New York a safer place.",
//     "popularity":6014.421,
//     "poster_path":"/77OPlbsvX3pzoFbyfpcE3GXMCod.jpg",
//     "production_companies":[
//        {
//           "id":25545,
//           "logo_path":"/jH9KNT9C9fYMrGqD4IKLlRL6MYN.png",
//           "name":"Wolf Entertainment",
//           "origin_country":"US"
//        },
//        {
//           "id":26727,
//           "logo_path":"/jeTxdjXhzgKZyLr3l9MllkTn3fy.png",
//           "name":"Universal Television",
//           "origin_country":"US"
//        },
//        {
//           "id":8301,
//           "logo_path":"/zrcVDabl14MNfPwxL8DC2IyR12t.png",
//           "name":"Universal Media Studios",
//           "origin_country":"US"
//        }
//     ],
//     "production_countries":[
//        {
//           "iso_3166_1":"US",
//           "name":"United States of America"
//        },
//        {
//           "iso_3166_1":"CA",
//           "name":"Canada"
//        },
//        {
//           "iso_3166_1":"SG",
//           "name":"Singapore"
//        }
//     ],
//     "seasons":[
//        {
//           "air_date":null,
//           "episode_count":7,
//           "id":1684,
//           "name":"Specials",
//           "overview":"",
//           "poster_path":"/vVUVEqs0KwplqHvv2GyCj2tpMSr.jpg",
//           "season_number":0,
//           "vote_average":0
//        },
//        {
//           "air_date":"1990-09-13",
//           "episode_count":22,
//           "id":1664,
//           "name":"Season 1",
//           "overview":"",
//           "poster_path":"/hGrkBU5p60zZj9bMByo9cegZfhl.jpg",
//           "season_number":1,
//           "vote_average":7.3
//        },
//        {
//           "air_date":"1991-09-17",
//           "episode_count":22,
//           "id":1665,
//           "name":"Season 2",
//           "overview":"",
//           "poster_path":"/nykyEGoMsVPnyrnoUL0g93YJPQZ.jpg",
//           "season_number":2,
//           "vote_average":7.3
//        },
//        {
//           "air_date":"1992-09-23",
//           "episode_count":22,
//           "id":1666,
//           "name":"Season 3",
//           "overview":"",
//           "poster_path":"/emKji2D1tLAJsFad84ENA4PufI5.jpg",
//           "season_number":3,
//           "vote_average":7.4
//        },
//        {
//           "air_date":"1993-09-15",
//           "episode_count":22,
//           "id":1667,
//           "name":"Season 4",
//           "overview":"",
//           "poster_path":"/fiSP98l9G7zjC0sBWwQ02Nmhpub.jpg",
//           "season_number":4,
//           "vote_average":7.3
//        },
//        {
//           "air_date":"1994-09-21",
//           "episode_count":23,
//           "id":1668,
//           "name":"Season 5",
//           "overview":"",
//           "poster_path":"/v8yqfobOp6jSDomgcOnotfsGM2i.jpg",
//           "season_number":5,
//           "vote_average":7.5
//        },
//        {
//           "air_date":"1995-09-20",
//           "episode_count":23,
//           "id":1669,
//           "name":"Season 6",
//           "overview":"",
//           "poster_path":"/5GaJYO3BXCUaHKXr9e7wC1IARwo.jpg",
//           "season_number":6,
//           "vote_average":7.6
//        },
//        {
//           "air_date":"1996-09-18",
//           "episode_count":23,
//           "id":1671,
//           "name":"Season 7",
//           "overview":"",
//           "poster_path":"/mEGBAiPkZcp4GgPv7CQmFhOEWrK.jpg",
//           "season_number":7,
//           "vote_average":7.5
//        },
//        {
//           "air_date":"1997-09-24",
//           "episode_count":24,
//           "id":1670,
//           "name":"Season 8",
//           "overview":"",
//           "poster_path":"/caieRmySO32CyyoPydhxGh7iN33.jpg",
//           "season_number":8,
//           "vote_average":7.4
//        },
//        {
//           "air_date":"1998-09-23",
//           "episode_count":24,
//           "id":1672,
//           "name":"Season 9",
//           "overview":"",
//           "poster_path":"/OuntFFHJqftivArTHjnFu1jSPM.jpg",
//           "season_number":9,
//           "vote_average":7.5
//        },
//        {
//           "air_date":"1999-09-22",
//           "episode_count":24,
//           "id":1673,
//           "name":"Season 10",
//           "overview":"",
//           "poster_path":"/fnYm6dcs1bmYvl3afnGxofsVgyw.jpg",
//           "season_number":10,
//           "vote_average":7.4
//        },
//        {
//           "air_date":"2000-10-18",
//           "episode_count":24,
//           "id":1675,
//           "name":"Season 11",
//           "overview":"",
//           "poster_path":"/u5MyTy53EWtnsMQewECGfNDywme.jpg",
//           "season_number":11,
//           "vote_average":7.2
//        },
//        {
//           "air_date":"2001-09-26",
//           "episode_count":24,
//           "id":1674,
//           "name":"Season 12",
//           "overview":"",
//           "poster_path":"/xAazzYBfFquWWqes5dozpQ0x4jW.jpg",
//           "season_number":12,
//           "vote_average":7.3
//        },
//        {
//           "air_date":"2002-10-02",
//           "episode_count":24,
//           "id":1676,
//           "name":"Season 13",
//           "overview":"",
//           "poster_path":"/2DzgIJzKVY9OfYxRMJjJLIZRhfi.jpg",
//           "season_number":13,
//           "vote_average":7.4
//        },
//        {
//           "air_date":"2003-09-24",
//           "episode_count":24,
//           "id":1677,
//           "name":"Season 14",
//           "overview":"",
//           "poster_path":"/26ByCQKroHuBs7ZgbkwHTsHvU77.jpg",
//           "season_number":14,
//           "vote_average":7.3
//        },
//        {
//           "air_date":"2004-09-22",
//           "episode_count":24,
//           "id":1678,
//           "name":"Season 15",
//           "overview":"",
//           "poster_path":"/z07aBZ5euhdhl0hyzWhwU1mGsrN.jpg",
//           "season_number":15,
//           "vote_average":7.2
//        },
//        {
//           "air_date":"2005-09-21",
//           "episode_count":22,
//           "id":1680,
//           "name":"Season 16",
//           "overview":"",
//           "poster_path":"/vo1hHZ1Bpt7XOYDqab7rqw5VTZL.jpg",
//           "season_number":16,
//           "vote_average":7.1
//        },
//        {
//           "air_date":"2006-09-22",
//           "episode_count":22,
//           "id":1679,
//           "name":"Season 17",
//           "overview":"",
//           "poster_path":"/zjSZrjqz9f3n6XoPYpaIgzwDQT3.jpg",
//           "season_number":17,
//           "vote_average":7
//        },
//        {
//           "air_date":"2008-01-02",
//           "episode_count":18,
//           "id":1682,
//           "name":"Season 18",
//           "overview":"",
//           "poster_path":"/q0nVi8xzk7DHpeFnQ678f8asYxC.jpg",
//           "season_number":18,
//           "vote_average":7.4
//        },
//        {
//           "air_date":"2008-11-05",
//           "episode_count":22,
//           "id":1681,
//           "name":"Season 19",
//           "overview":"",
//           "poster_path":"/fIIoj3EzsHcgF9Yd0ISWKinmLX8.jpg",
//           "season_number":19,
//           "vote_average":7.1
//        },
//        {
//           "air_date":"2009-09-25",
//           "episode_count":23,
//           "id":1683,
//           "name":"Season 20",
//           "overview":"",
//           "poster_path":"/yoISWagCsb16Hnoi16Ot1nur2FV.jpg",
//           "season_number":20,
//           "vote_average":7
//        },
//        {
//           "air_date":"2022-02-24",
//           "episode_count":10,
//           "id":219379,
//           "name":"Season 21",
//           "overview":"",
//           "poster_path":"/l7qr5Q5iJXeja9iDmdXagoUZ0Vm.jpg",
//           "season_number":21,
//           "vote_average":7.9
//        },
//        {
//           "air_date":"2022-09-22",
//           "episode_count":22,
//           "id":299108,
//           "name":"Season 22",
//           "overview":"",
//           "poster_path":"/uDMvDJvbji8VS2pSgdDjBQbCT0o.jpg",
//           "season_number":22,
//           "vote_average":7.7
//        },
//        {
//           "air_date":null,
//           "episode_count":1,
//           "id":366617,
//           "name":"Season 23",
//           "overview":"",
//           "poster_path":null,
//           "season_number":23,
//           "vote_average":0
//        }
//     ],
//     "spoken_languages":[
//        {
//           "english_name":"English",
//           "iso_639_1":"en",
//           "name":"English"
//        }
//     ],
//     "status":"Returning Series",
//     "tagline":"In the complex process of determining guilt and innocence, lives often hang in the balance.",
//     "type":"Scripted",
//     "vote_average":7.43,
//     "vote_count":486
//  }
const TvShowScreen = () => {
  const {
    params: { id },
  } = useRoute();

  const { data: metaTrailerData, isLoading: videoTrailerDataLoading } =
    useSWR<TrailerVideoListResponseType>(
      API.getDetailMeta(id, "videos", "movie"),
      fetcher
    );

  const { data, isLoading } = useSWR<MovieDetailType>(
    API.getMovieDetail(id, "tv"),
    fetcher
  );

  const { data: metaCastData, isLoading: metaCastLoading } =
    useSWR<MetaCastListResponseType>(
      API.getDetailMeta(id, "credits", "tv"),
      fetcher
    );

  const { data: metaSimilarData, isLoading: metaSimilarListLoading } = useSWR<
    CommonResponse<MovieType[]>
  >(API.getDetailMeta(id, "similar", "tv"), fetcher);

  const { data: metaReviewsData, isLoading: mataReviewLoading } = useSWR<
    CommonResponse<ReviewType[]>
  >(API.getDetailMeta(id, "reviews", "tv"), fetcher);

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
      <TvShowOverview data={data} />
      <SeasonList seriesId={id} seasons={data?.seasons ?? []} />
      {/* <TrailerList
        isLoading={videoTrailerDataLoading}
        text="Trailer"
        data={trailerList}
      /> */}
      {/* <Cast text="Cast of the movie" data={castList} /> */}
      {/* <MovieList
        isLoading={metaSimilarListLoading}
        title="Similar movies"
        data={similarList}
      /> */}
      {/* <MovieList
        isLoading={recommendLoading}
        title="Recommendations"
        data={recommendationList}
      /> */}
      {/* <ReviewList data={reviewsList} /> */}
    </LayoutDefault>
  );
};

export default TvShowScreen;