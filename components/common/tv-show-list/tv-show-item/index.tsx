import React, { ReactNode } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { format } from "date-fns";
import tw from "twrnc";
import { API } from "../../../../api";
import { styles } from "../../../../theme";
import { TvShowType } from "../../../../types";
import Rate from "../../rate";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const { width } = Dimensions.get("window");

interface TvShowItemProp {
  data: TvShowType;
  children?: ReactNode;
}

const TvShowItem = ({ data, children }: TvShowItemProp) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableWithoutFeedback
      key={data.id}
      onPress={() => navigation.navigate("TvShow", { id: data.id })}
    >
      <View style={tw`mx-2`}>
        <View>
          <Image
            source={{
              uri: API.getImageUrl(data?.backdrop_path || data?.poster_path),
            }}
            style={{
              width: width * 0.75,
              height: 180,
              ...tw`rounded-3xl  `,
            }}
          />
          <View style={tw`absolute left-4 -bottom-4 bg-slate-900 rounded-full`}>
            <Rate progress={data.vote_average / 10} rate={data.vote_average} />
          </View>
        </View>
        <View style={tw`pt-5 px-2`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ ...tw`font-bold `, ...styles.text }}
          >
            {data.name}
          </Text>
          {data?.first_air_date && (
            <Text style={tw`text-slate-500 mt-0.5 text-xs`}>
              {format(new Date(data.first_air_date), "MMMM dd, yyyy")}
            </Text>
          )}
          <Text
            style={{
              width: width * 0.75,
              ...tw`text-sm text-slate-400 mt-1.5`,
            }}
            numberOfLines={2}
          >
            {data.overview}
          </Text>
        </View>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TvShowItem;
