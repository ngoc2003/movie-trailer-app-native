import React from "react";
import { Text, View } from "react-native";
import OverviewText from "../text";
import tw from "twrnc";
import { GenresDetailType } from "../../../../types";

interface GenresListProps {
  genres: GenresDetailType[];
}

const GenreList = ({ genres }: GenresListProps) => {
  return (
    <View style={tw`flex-row mr-1 flex-wrap mb-2`}>
      {genres.map((item, index) => (
        <OverviewText key={item.id}>
          {item.name}
          {index !== genres.length - 1 && <Text>, </Text>}
        </OverviewText>
      ))}
    </View>
  );
};

export default GenreList;
