import { View, ViewStyle } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { theme } from "../../../theme";
import tw from "twrnc";

interface LoadingProp {
  style?: ViewStyle;
}

export default function Loading({ style }: LoadingProp) {
  return (
    <View
      style={{
        ...tw`h-40 flex-1 flex-row justify-center items-center bg-slate-900`,
        ...style,
      }}
    >
      <Progress.CircleSnail thickness={4} size={60} color={theme.main} />
    </View>
  );
}
