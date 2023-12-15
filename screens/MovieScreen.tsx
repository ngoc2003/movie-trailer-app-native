import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/movie-screen/cast";
import MovieList from "../components/common/movie-list";
import TopNavigation from "../components/common/top-navigation";
import tw from "twrnc";
import useSWR from "swr";
import { API, fetcher } from "../api";
import Loading from "../components/common/loading";
import { MovieType } from "../types";
import ReviewList from "../components/common/review-list";
import TrailerList from "../components/common/trailer-list";

const ios = Platform.OS == "ios";

const { width, height } = Dimensions.get("window");

// {
//   "adult": false,
//   "backdrop_path": "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
//   "belongs_to_collection": null,
//   "budget": 25000000,
//   "genres": [
//     {
//       "id": 18,
//       "name": "Drama"
//     },
//     {
//       "id": 80,
//       "name": "Crime"
//     }
//   ],
//   "homepage": "",
//   "id": 278,
//   "imdb_id": "tt0111161",
//   "original_language": "en",
//   "original_title": "The Shawshank Redemption",
//   "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
//   "popularity": 161.695,
//   "poster_path": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
//   "production_companies": [
//     {
//       "id": 97,
//       "logo_path": "/7znWcbDd4PcJzJUlJxYqAlPPykp.png",
//       "name": "Castle Rock Entertainment",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "1994-09-23",
//   "revenue": 28341469,
//   "runtime": 142,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "Fear can hold you prisoner. Hope can set you free.",
//   "title": "The Shawshank Redemption",
//   "video": false,
//   "vote_average": 8.706,
//   "vote_count": 25090
// }

// meta: cast

// "cast":[
//   {
//      "adult":false,
//      "cast_id":146,
//      "character":"Don Vito Corleone",
//      "credit_id":"6489aa85e2726001072483a9",
//      "gender":2,
//      "id":3084,
//      "known_for_department":"Acting",
//      "name":"Marlon Brando",
//      "order":0,
//      "original_name":"Marlon Brando",
//      "popularity":16.978,
//      "profile_path":"/fuTEPMsBtV1zE98ujPONbKiYDc2.jpg"
//   },
//   {
//      "adult":false,
//      "cast_id":147,
//      "character":"Michael Corleone",
//      "credit_id":"6489aa936f8d9500afdf219c",
//      "gender":2,
//      "id":1158,
//      "known_for_department":"Acting",
//      "name":"Al Pacino",
//      "order":1,
//      "original_name":"Al Pacino",
//      "popularity":38.233,
//      "profile_path":"/2dGBb1fOcNdZjtQToVPFxXjm4ke.jpg"
//   },
// ],
// "id":238

// {

//   page: 1,
//   results: [
//     {
//       "adult":false,
//       "backdrop_path":"/3RKBbSG68HdAeXmVa3h9G7nBMbh.jpg",
//       "genre_ids":[
//          "Array"
//       ],
//       "id":25392,
//       "original_language":"en",
//       "original_title":"Destination Moon",
//       "overview":"Postulates the first manned trip to the moon, happening in the (then) near future, and being funded by a consortium of private backers. Assorted difficulties occur and must be overcome in-flight. Attempted to be realistic, with Robert A. Heinlein providing advice.",
//       "popularity":15.007,
//       "poster_path":"/xuwKuXMlZfvfVDUAYvmpZrXMfPD.jpg",
//       "release_date":"1950-06-27",
//       "title":"Destination Moon",
//       "video":false,
//       "vote_average":5.8,
//       "vote_count":74
//    }
//   ],
//   "total_pages":11347,
//   "total_results":226926
// }

// reviews

// "id":238,
//    "page":1,
//    "results":[
//       {
//          "author":"futuretv",
//          "author_details":[
// "avatar_path":"/cQA4kDpzipZsXGsx106NHjVz0n9.jpg",
// "name":"Lachlan Thiele",
// "rating":8,
// "username":"lachlanthiele"//          ],
//          "content":"The Godfather Review by Al Carlson..."
//          "created_at":"2014-04-10T20:09:40.500Z",
//          "id":"5346fa840e0a265ffa001e20",
//          "updated_at":"2021-06-23T15:57:25.895Z",
//          "url":"https://www.themoviedb.org/review/5346fa840e0a265ffa001e20"
//       },
//    ],
//    "total_pages":1,
//    "total_results":5
const MovieScreen = () => {
  const {
    params: { id },
  } = useRoute();

  const navigation = useNavigation();

  const { data, isLoading } = useSWR(API.getMovieDetail(id, "movie"), fetcher);

  const { data: metaCastData } = useSWR(
    API.getDetailMeta(id, "credits", "movie"),
    fetcher
  );

  const { data: metaSimilarData } = useSWR(
    API.getDetailMeta(id, "similar", "movie"),
    fetcher
  );
  const { data: metaReviewsData } = useSWR(
    API.getDetailMeta(id, "reviews", "movie"),
    fetcher
  );
  const { data: metaTrailerData } = useSWR(
    API.getDetailMeta(id, "videos", "movie"),
    fetcher
  );

  const castList = metaCastData?.cast ?? [];

  const trailerList = metaTrailerData?.results ?? [];

  const reviewsList = metaReviewsData?.results ?? [];

  const similarList: MovieType[] = metaSimilarData?.results ?? [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={tw`flex-1 bg-neutral-900`}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <TopNavigation />

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

        <View
          style={{
            marginTop: -height * 0.1,
            ...tw`px-3`,
          }}
        >
          <Text style={tw`text-neutral-500 text-sm italic mb-1 text-center`}>
            {data.tagline}
          </Text>
          <Text
            style={{ ...styles.text, ...tw`text-center text-2xl font-bold` }}
          >
            {data.title}
          </Text>
          <Text style={tw`text-neutral-500 font-semibold text-center text-sm`}>
            Release - {data.release_date} - {data.runtime}min
          </Text>
          <View style={tw`flex-row items-center justify-center mx-2`}>
            {data.genres.map((item, index) => (
              <Text
                key={item.id}
                style={tw`text-neutral-400 font-semibold text-base text-center`}
              >
                {item.name}
                {index !== data.genres.length - 1 && <Text> - </Text>}
              </Text>
            ))}
          </View>

          <Text style={tw`text-white text-lg font-semibold mt-2 mb-1`}>
            - Overview
          </Text>
          <Text style={tw`text-neutral-400 tracking-wide`}>
            {data.overview}
          </Text>
        </View>
        <View
          style={{
            width: width,
            ...tw`flex-row px-3 my-4`,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={tw`my-2 mb-3`}>
              <Text style={tw`text-white font-semibold`}>- Status</Text>
              <Text style={tw`text-neutral-400 mt-0.5 text-sm`}>
                {data.status}
              </Text>
            </View>
            <View style={tw`my-2 mb-3`}>
              <Text style={tw`text-white font-semibold`}>
                - Original Language
              </Text>
              <Text style={tw`text-neutral-400 mt-0.5 text-sm`}>
                {data.original_language}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={tw`my-2 mb-3`}>
              <Text style={tw`text-white font-semibold`}>- Budget</Text>
              <Text style={tw`text-neutral-400 mt-0.5 text-sm`}>
                {data.budget}
              </Text>
            </View>
            <View style={tw`my-2 mb-3`}>
              <Text style={tw`text-white font-semibold`}>- Revenue</Text>
              <Text style={tw`text-neutral-400 mt-0.5 text-sm`}>
                {data.revenue}
              </Text>
            </View>
          </View>
        </View>

        <TrailerList text="Trailer" data={trailerList} />

        <Cast text="Cast of the movie" data={castList} />
        <MovieList title="Similar movies" data={similarList} />
        <ReviewList data={reviewsList} />
      </ScrollView>
    </View>
  );
};

export default MovieScreen;
