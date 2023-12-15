import React from "react";
import { Text, View } from "react-native";
import OverviewText from "../text";
import tw from "twrnc";

const GenreList = ({ genres }) => {
  return (
    <View style={tw`flex-row mr-1`}>
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
