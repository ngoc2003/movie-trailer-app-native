import React from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import tw from "twrnc";
import { theme } from "../../../theme";
import { API } from "../../../api";
import { format } from "date-fns";
import Rate from "../rate";

const { width } = Dimensions.get("screen");

const ReviewList = ({ data }) => {
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
        renderItem={({ item }) => (
          <View
            style={{
              width: width * 0.8,
              ...tw`bg-neutral-800 p-4 mx-2 rounded-md`,
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
                    uri: API.getImageUrl(item.author_details.avatar_path),
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={tw`text-neutral-400 font-semibold`}>
                  A review by <Text style={tw`text-white`}>{item.author}</Text>
                </Text>
                <Text style={tw`text-neutral-500 text-xs mt-0.5`}>
                  {format(new Date(item.created_at), "dd-MM-yyyy")}
                </Text>
              </View>
              <Rate
                rate={item?.author_details.rating}
                size="small"
                progress={item?.author_details.rating}
              />
            </View>
            <Text numberOfLines={10} style={{ ...tw`text-neutral-400 mt-4` }}>
              {item?.content}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReviewList;
