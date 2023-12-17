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
import MovieList from "../../common/movie-list";
import { theme } from "../../../theme";
import { styles } from "../../../theme";

import tw from "twrnc";
import TvShowItem from "../../common/tv-show-list/tv-show-item";
import Rate from "../../common/rate";
import { API } from "../../../api";
import { format } from "date-fns";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//        {
//           "air_date":null,
//           "episode_count":7,
//           "id":1684,
//           "name":"Specials",
//           "overview":"",
//           "poster_path":"/vVUVEqs0KwplqHvv2GyCj2tpMSr.jpg",
//           "season_number":0,
//           "vote_average":0
//        },

const { width } = Dimensions.get("window");

const SeasonList = ({ seriesId, title = " Season List ", seasons }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
        data={seasons}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() =>
              navigation.navigate("Season", {
                seriesId: seriesId,
                seasonNumber: item.season_number,
              })
            }
          >
            <View style={tw`mx-2`}>
              <View>
                <Image
                  source={{
                    uri: API.getImageUrl(
                      item?.backdrop_path || item?.poster_path
                    ),
                  }}
                  style={{
                    width: width * 0.75,
                    height: 180,
                    ...tw`rounded-3xl  `,
                  }}
                />
                <View
                  style={tw`absolute left-4 -bottom-4 bg-slate-900 rounded-full`}
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
                  style={{ ...tw`font-bold text-base`, ...styles.text }}
                >
                  {item.name}
                </Text>
                {item.air_date && (
                  <Text
                    style={{
                      ...tw`text-slate-500 mt-0.5 text-xs`,
                    }}
                  >
                    {format(new Date(item.air_date), "MMMM dd, yyyy")}
                  </Text>
                )}
                <Text style={tw`text-slate-400 mt-2 text-sm`}>
                  Episode count: {item.episode_count}
                </Text>
                <Text
                  style={{
                    width: width * 0.75,
                    ...tw`text-sm text-slate-400 mt-1.5`,
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

export default SeasonList;
