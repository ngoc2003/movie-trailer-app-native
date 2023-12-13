import React, { useState } from "react";
import { Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import { styles, theme } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import tw from "twrnc";

const isIos = Platform.OS === "ios";

const TopNavigation = ({ isDock = false }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <View style={tw`w-full z-20 px-4 ${!isDock ? "absolute" : ""}`}>
      <SafeAreaView
        style={tw`w-full flex-row justify-between items-center android:mt-4`}
      >
        <TouchableOpacity
          style={{ ...tw`rounded-xl p-1`, ...styles.background }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={3} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon size={35} color={isFavorite ? theme.main : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default TopNavigation;
