import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { PeopleType } from "../../../../types";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "twrnc";
import { API } from "../../../../api";

interface PeopleItemCardProp {
  data: PeopleType;
  isReverse?: boolean;
}

const { width } = Dimensions.get("window");

const PeopleItemCard = ({ data: person, isReverse }: PeopleItemCardProp) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Artist", { id: person.id })}
      style={{
        width: width * 0.85,
        ...tw`ml-4 items-center`,
      }}
    >
      <View style={tw`my-4 ${isReverse ? "flex-row-reverse" : "flex-row"}`}>
        <View style={tw`overflow-hidden items-center`}>
          <Image
            style={{
              width: width * 0.4,
              height: 120,
              ...tw`rounded-2xl`,
            }}
            source={{
              uri: person.profile_path
                ? API.getImageUrl(person.profile_path)
                : "https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available.jpg?ver=6",
            }}
          />
        </View>
        <View style={tw`flex-col px-3 py-4 mt-auto`}>
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
  );
};

export default PeopleItemCard;
