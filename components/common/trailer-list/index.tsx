import React, { memo } from "react";
import { Dimensions, Text, View } from "react-native";
import tw from "twrnc";
import Carousel from "react-native-snap-carousel-v4";
import { styles } from "../../../theme";
import TrailerVideoItem from "./trailer-video-item";
import { TrailerVideoType } from "../../../types";

interface TrailerListProps {
  text?: string;
  data: TrailerVideoType[];
  isLoading?: boolean;
}

const { width } = Dimensions.get("window");

const TrailerList = ({
  text = "List movie trailer",
  data,
  isLoading,
}: TrailerListProps) => {
  console.log(width);
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
      {isLoading ? (
        <TrailerList.Skeleton />
      ) : (
        <Carousel
          data={data}
          renderItem={({ item }) => {
            return <TrailerVideoItem data={item} />;
          }}
          vertical={false}
          firstItem={0}
          sliderWidth={320}
          itemWidth={290}
          slideStyle={{
            display: "flex",
            alignItems: "center",
            ...tw`animate-pulse`,
          }}
        />
      )}
    </View>
  );
};

export default memo(TrailerList);

TrailerList.Skeleton = function () {
  return (
    <Carousel
      data={[1, 2, 3, 4]}
      renderItem={({ item }) => {
        return <TrailerVideoItem.Skeleton />;
      }}
      vertical={false}
      firstItem={0}
      sliderWidth={width}
      itemWidth={290}
      slideStyle={{
        display: "flex",
        alignItems: "center",
        ...tw`animate-pulse`,
      }}
    />
  );
};
