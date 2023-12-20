import React, { memo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles, theme } from "../../../theme";
import tw from "twrnc";
import { TvShowType } from "../../../types";
import TvShowItem from "./tv-show-item";

interface TvShowListProps {
  title: string;
  data: TvShowType[];
}

const TvShowList = ({ title, data }: TvShowListProps) => {
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
          {/* <Text style={[styles.text, { fontWeight: "bold" }]}>See All</Text> */}
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        nestedScrollEnabled={true}
        data={data}
        renderItem={({ item }) => <TvShowItem data={item} />}
      />
    </View>
  );
};

export default memo(TvShowList);
