import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles, theme } from "../../../theme";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MovieType } from "../../../types";
import MovieCard from "../movie-card";
import tw from "twrnc";

interface MovieListProps {
  title: string;
  data: MovieType[];
  isLoading?: boolean;
}
const MovieList = ({ title, data, isLoading }: MovieListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View
      style={{
        marginBottom: 32,
        marginHorizontal: 4,
      }}
    >
      <View
        style={{
          borderColor: theme.main,
          ...tw`border-l-4 flex-row items-center pl-2 justify-between mb-4 mt-2 mx-4`,
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>{title}</Text>
        <TouchableOpacity>
          <Text style={[styles.text, { fontWeight: "bold" }]}>See All</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <MovieList.Skeleton />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          nestedScrollEnabled={true}
          data={data}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback key={item.id}>
              <MovieCard
                size="small"
                movie={item}
                onPress={() => navigation.navigate("Movie", item)}
              />
            </TouchableWithoutFeedback>
          )}
        />
      )}
    </View>
  );
};

export default MovieList;

MovieList.Skeleton = () => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      nestedScrollEnabled={true}
      data={[1, 2, 3, 4]}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback key={item}>
          <MovieCard.Skeleton size="small" />
        </TouchableWithoutFeedback>
      )}
    />
  );
};
