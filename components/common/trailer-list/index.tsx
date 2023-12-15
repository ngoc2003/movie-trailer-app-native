import React from "react";
import { Dimensions, Text, View } from "react-native";
import tw from "twrnc";
import Carousel from "react-native-snap-carousel-v4";
import { styles } from "../../../theme";
import TrailerVideoItem from "./trailer-video-item";
import { TrailerVideoType } from "../../../types";

interface TrailerListProps {
  text?: string;
  data: TrailerVideoType[];
}

const { width } = Dimensions.get("window");

const TrailerList = ({
  text = "List movie trailer",
  data,
}: TrailerListProps) => {
  return (
    <View>
      <Text
        style={{
          ...styles.text,
          marginLeft: 16,
          ...tw`text-2xl mb-4 font-semibold`,
        }}
      >
        {text}
      </Text>
      <Carousel
        data={data}
        renderItem={({ item }) => {
          return <TrailerVideoItem data={item} />;
        }}
        vertical={false}
        firstItem={0}
        sliderWidth={width}
        itemWidth={width * 0.9}
        slideStyle={{
          display: "flex",
          alignItems: "center",
          ...tw`animate-pulse`,
        }}
      />
    </View>
  );
};

export default TrailerList;
