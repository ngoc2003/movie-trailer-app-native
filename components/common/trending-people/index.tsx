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

interface TrendingPeppleProps {
  data: TrendingPeopleType[];
}

const { width } = Dimensions.get("window");

const TrendingPeople = ({ data }: TrendingPeppleProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={{ ...tw`my-6 bg-opacity-30 py-4 pb-8 bg-[#211f30]` }}>
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
                    uri:
                      API.getImageUrl(person.profile_path ?? "") ||
                      "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/09/hinh-nen-dien-thoai-cute-2022-19-696x1237.jpg?fit=700%2C20000&quality=95&ssl=1",
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
                    ...tw`text-slate-300 text-xs mt-1`,
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
