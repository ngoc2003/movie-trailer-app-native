import React, { memo } from "react";
import { FlatList, Text } from "react-native";
import MovieCard from "../../common/movie-list/movie-card";
import TvShowItem from "../../common/tv-show-list/tv-show-item";
import tw from "twrnc";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CombinedCreditOfArtistType } from "../../../types";

interface CombinedCreditListProp {
  data: CombinedCreditOfArtistType[];
}

const CombinedCreditList = ({ data }: CombinedCreditListProp) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) =>
        item?.media_type === "movie" ? (
          <MovieCard
            movie={item}
            size="small"
            onPress={() => navigation.navigate("Movie", { id: item.id })}
          >
            {item?.character && <KnownAs character={item.character} />}
          </MovieCard>
        ) : (
          <TvShowItem data={item as any}>
            {item?.character && <KnownAs character={item.character} />}
          </TvShowItem>
        )
      }
    />
  );
};

export default memo(CombinedCreditList);

interface KnownAsProp {
  character: string;
}

const KnownAs = ({ character }: KnownAsProp) => (
  <Text style={{ width: 180, ...tw`p-2 text-slate-400` }}>As {character}</Text>
);
