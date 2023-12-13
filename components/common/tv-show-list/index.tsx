import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles, theme } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../../api";
import Rate from "../rate";
import { format } from "date-fns";
import tw from "twrnc";
import { TvShowType } from "../../../types";

const { width } = Dimensions.get("window");

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
          <Text style={[styles.text, { fontWeight: "bold" }]}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        nestedScrollEnabled={true}
        data={data}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback key={item.id}>
            <View style={tw`mx-2`}>
              <View>
                <Image
                  source={{
                    uri: API.getImageUrl(item.backdrop_path),
                  }}
                  style={{
                    width: width * 0.75,
                    height: 180,
                    ...tw`rounded-3xl object-cover`,
                  }}
                />
                <View
                  style={tw`absolute left-4 -bottom-4 bg-neutral-900 rounded-full`}
                >
                  <Rate
                    progress={item.vote_average / 10}
                    rate={item.vote_average}
                  />
                </View>
              </View>
              <View style={tw`pt-5 px-2`}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ ...tw`font-bold `, ...styles.text }}
                >
                  {item.name}
                </Text>
                {item?.first_air_date && (
                  <Text style={tw`text-neutral-500 mt-0.5 text-xs`}>
                    {format(new Date(item.first_air_date), "MMMM dd, yyyy")}
                  </Text>
                )}
                <Text
                  style={{
                    width: width * 0.75,
                    ...tw`text-sm text-neutral-400 mt-1.5`,
                  }}
                  numberOfLines={2}
                >
                  {item.overview}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

export default TvShowList;
