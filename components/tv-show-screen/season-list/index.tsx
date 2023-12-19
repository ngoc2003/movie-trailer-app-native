import React, { memo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../theme";
import { styles } from "../../../theme";

import tw from "twrnc";
import SeasonItem from "./season-item";
import { SeasonType } from "../../../types";

interface SeasonListProps {
  seriesId: string;
  title?: string;
  seasons: SeasonType[];
}

const SeasonList = ({
  seriesId,
  title = " Season List ",
  seasons,
}: SeasonListProps) => {
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
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        keyExtractor={(item) => item.id.toString()}
        nestedScrollEnabled={true}
        data={seasons}
        renderItem={({ item }) => (
          <SeasonItem seriesId={seriesId} data={item} />
        )}
      />
    </View>
  );
};

export default memo(SeasonList);
