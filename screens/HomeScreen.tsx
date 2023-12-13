import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { styles } from "../theme";
import TrendingMovies from "../components/common/trending-movies";
import MovieList from "../components/common/movie-list";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useSWR from "swr";
import {
  CommonResponse,
  MovieType,
  TrendingPeopleType,
  TvShowType,
} from "../types";
import { API, fetcher } from "../api";
import TvShowList from "../components/common/tv-show-list";
import tw from "twrnc";
import TrendingPeople from "../components/common/trending-people";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
    isLoading: animeEpisodeLoading,
  } = useSWR<CommonResponse<TvShowType[]>>(
    () => API.getAnimeEpisodeList(),
    fetcher
  );

  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      <SafeAreaView style={tw`ios:mb-2 android:mb-3`}>
        <StatusBar translucent={false} style="dark" />
        <View style={tw`flex-row justify-between items-center mx-4 pt-3 pb-2`}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text style={tw`text-white text-3xl font-bold`}>
            <Text style={styles.text}>TL</Text> Movies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsHorizontalScrollIndicator
        contentContainerStyle={{ paddingBottom: 10 }}
      >
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
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
