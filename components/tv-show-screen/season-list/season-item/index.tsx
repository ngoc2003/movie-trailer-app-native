import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import tw from "twrnc";
import { API } from "../../../../api";
import Rate from "../../../common/rate";
import { format } from "date-fns";
import { styles } from "../../../../theme";
import { SeasonType } from "../../../../types";

const { width } = Dimensions.get("window");

interface SeasonItemProps {
  data: SeasonType;
  seriesId: string;
}

const SeasonItem = ({ data: item, seriesId }: SeasonItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
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
              uri: API.getImageUrl(item.poster_path),
            }}
            style={{
              width: width * 0.75,
              height: 180,
              ...tw`rounded-3xl  `,
            }}
          />
          <View style={tw`absolute left-4 -bottom-4 bg-slate-900 rounded-full`}>
            <Rate progress={item.vote_average / 10} rate={item.vote_average} />
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
  );
};

export default SeasonItem;
