import React from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import tw from "twrnc";
import { theme } from "../../../theme";
import ReviewItem from "./review-item";
import { ReviewType } from "../../../types";

interface ReviewListProps {
  data: ReviewType[];
}

const ReviewList = ({ data }: ReviewListProps) => {
  return (
    <View>
      <View
        style={{
          borderColor: theme.main,
          ...tw`border-l-4 px-2 ml-4 mb-4`,
        }}
      >
        <Text
          style={{
            ...tw`text-white text-xl`,
          }}
        >
          Reviews
        </Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <ReviewItem key={item.id} data={item} />}
      />
    </View>
  );
};

export default ReviewList;
