import React, { memo } from "react";
import { FlatList, Text, View } from "react-native";
import { theme } from "../../../theme";
import tw from "twrnc";
import EpisodeItem from "./episode-item";
import { EpisodeType } from "../../../types";

interface EpisodeListProp {
  data: EpisodeType[];
  voteAverage: number;
}

const EpisodeList = ({ data: episodes, voteAverage }: EpisodeListProp) => {
  return (
    <View>
      <Text style={tw`p-4 text-[${theme.main}] text-xl font-semibold`}>
        List of episodes ({episodes.length})
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={episodes}
        renderItem={({ item: episode }) => (
          <EpisodeItem voteAverage={voteAverage} data={episode} />
        )}
      />
    </View>
  );
};

export default memo(EpisodeList);
