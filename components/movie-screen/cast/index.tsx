import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { API } from "../../../api";
import tw from "twrnc";
import { CastType } from "../../../types";

interface CastProps {
  text?: string;
  data: CastType[];
}
const Cast = ({ text = "Top cast", data }: CastProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  if (!data?.length) {
    return null;
  }

  return (
    <View style={tw`my-6`}>
      <Text style={tw`text-white text-lg mx-4 mb-5 font-semibold`}>{text}</Text>
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
                onPress={() => navigation.navigate("Artist", { id: person.id })}
              >
                <View
                  style={tw`overflow-hidden rounded-full h-20 w-20 border items-center border-slate-500`}
                >
                  <Image
                    style={tw`rounded-2xl h-24 w-20`}
                    source={{
                      uri: person.profile_path
                        ? API.getImageUrl(person.profile_path)
                        : "https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available.jpg?ver=6",
                    }}
                  />
                </View>
                <Text numberOfLines={1} style={tw`text-white text-xs mt-1`}>
                  {person.name}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    maxWidth: 100,
                    ...tw`text-slate-400 text-xs mt-1 text-center`,
                  }}
                >
                  {person.character}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
