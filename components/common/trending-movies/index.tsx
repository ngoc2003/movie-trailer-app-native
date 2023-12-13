import React, { useCallback } from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-snap-carousel-v4";
import MovieCard from "../movie-card";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
let { width } = Dimensions.get("window");
import useSWR from "swr";
import { API, fetcher } from "../../../api";
import { CommonResponse, MovieType } from "../../../types";
import tw from "twrnc";

const TrendingMovies = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { data, error, isLoading } = useSWR<CommonResponse<MovieType[]>>(
    () => API.getMovieList("popular", 1, "movie"),
    fetcher
  );

  if (error) {
    return <Text>Error loading data</Text>;
  }

  return (
    <View style={tw`mb-8`}>
      {!data && isLoading ? (
        <TrendingMovies.Skeleton />
      ) : (
        <Carousel
          data={data!.results}
          renderItem={({ item }) => {
            return (
              <MovieCard
                movie={item}
                onPress={() => navigation.navigate("Movie", { id: item.id })}
              />
            );
          }}
          vertical={false}
          firstItem={0}
          sliderWidth={width}
          itemWidth={width * 0.7}
          slideStyle={{
            display: "flex",
            alignItems: "center",
          }}
        />
      )}
    </View>
  );
};

export default TrendingMovies;

TrendingMovies.Skeleton = function () {
  return (
    <Carousel
      data={[1, 2, 3, 4]}
      renderItem={() => {
        return <MovieCard.Skeleton />;
      }}
      vertical={false}
      firstItem={0}
      sliderWidth={width}
      itemWidth={width * 0.7}
      slideStyle={{
        display: "flex",
        alignItems: "center",
        ...tw`animate-pulse`,
      }}
    />
  );
};
