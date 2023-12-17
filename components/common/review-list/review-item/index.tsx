import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { API } from "../../../../api";
import { format } from "date-fns";
import Rate from "../../rate";
import tw from "twrnc";

interface ReviewItemProps {
  data: any;
}

const { width } = Dimensions.get("window");

const ReviewItem = ({ data }: ReviewItemProps) => {
  return (
    <View
      style={{
        width: width * 0.8,
        ...tw`bg-[#211f30] p-4 mx-2 rounded-md`,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ paddingRight: 8 }}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
            source={{
              uri: API.getImageUrl(data.author_details.avatar_path),
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={tw`text-slate-400 font-semibold`}>
            A review by <Text style={tw`text-white`}>{data.author}</Text>
          </Text>
          <Text style={tw`text-slate-500 text-xs mt-0.5`}>
            {format(new Date(data.created_at), "dd-MM-yyyy")}
          </Text>
        </View>
        <Rate
          rate={data?.author_details.rating}
          size="small"
          progress={data?.author_details.rating}
        />
      </View>
      <Text numberOfLines={10} style={{ ...tw`text-slate-400 mt-4` }}>
        {data?.content}
      </Text>
    </View>
  );
};

export default ReviewItem;
