import { View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../../../theme";
import tw from "twrnc";

export default function Loading() {
  return (
    <View
      style={{
        ...tw`h-40 flex-1 flex-row justify-center items-center bg-neutral-900`,
      }}
    >
      <Progress.CircleSnail thickness={4} size={60} color={theme.main} />
    </View>
  );
}
