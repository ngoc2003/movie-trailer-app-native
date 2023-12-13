import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { API } from "../../../api";
import tw from "twrnc";
import { TrendingPeopleType } from "../../../types";
import { styles } from "../../../theme";

interface TrendingPeppleProps {
  data: TrendingPeopleType[];
}

const { width } = Dimensions.get("window");

const TrendingPeople = ({ data }: TrendingPeppleProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={{ ...tw`my-6 bg-opacity-30 py-4 pb-8 bg-neutral-600` }}>
      <Text style={tw`text-center text-xl text-white mx-4 mb-5 font-bold`}>
        Trending people
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={({ item: person }) => (
          <TouchableOpacity
            key={person.id}
            onPress={() => navigation.navigate("Artist", person)}
            style={{
              width: width * 0.85,
              ...tw`ml-4 items-center`,
            }}
          >
            <View style={tw`flex-row`}>
              <View style={tw`overflow-hidden items-center`}>
                <Image
                  style={{
                    width: width * 0.4,
                    height: 120,
                    ...tw`rounded-2xl`,
                  }}
                  source={{
                    uri: API.getImageUrl(person.profile_path ?? ""),
                  }}
                />
              </View>
              <View style={tw`flex-col pl-3 py-4 mt-auto`}>
                <Text
                  numberOfLines={1}
                  style={tw`text-white text-base font-semibold`}
                >
                  {person.name}
                </Text>
                <Text
                  ellipsizeMode="tail"
                  style={{
                    width: width * 0.4,
                    ...tw`text-neutral-300 text-xs mt-1`,
                  }}
                  numberOfLines={3}
                >
                  {person.known_for.map((product) => (
                    <Text key={product.id}>{product.title}, </Text>
                  ))}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TrendingPeople;
