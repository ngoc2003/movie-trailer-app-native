import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { API } from "../../../api";
import tw from "twrnc";

const Cast = ({ text = "Top cast", data }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={tw`my-6`}>
      <Text style={tw`text-white text-lg mx-4 mb-5`}>{text}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {data &&
          data.map((person) => {
            return (
              <TouchableOpacity
                key={person.id}
                style={tw`mr-4 items-center`}
                onPress={() => navigation.navigate("Artist", person.id)}
              >
                <View
                  style={tw`overflow-hidden rounded-full h-20 w-20 border items-center border-neutral-500`}
                >
                  <Image
                    style={tw`rounded-2xl h-24 w-20`}
                    source={{
                      uri: API.getImageUrl(person.profile_path),
                    }}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={tw`text-neutral-400 text-xs mt-1`}
                >
                  {person.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;