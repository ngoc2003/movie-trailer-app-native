import React from "react";
import { FlatList, Text, View } from "react-native";
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
      {data.length ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <ReviewItem key={item.id} data={item} />}
        />
      ) : (
        <Text style={tw`text-slate-400 text-base px-4`}>
          No reviews founded!
        </Text>
      )}
    </View>
  );
};

export default ReviewList;
