import React from "react";
import { View, ViewStyle } from "react-native";
import { theme } from "../../../theme";

interface DividerProp {
  style?: ViewStyle;
}

const Divider = ({ style }: DividerProp) => {
  return (
    <View
      style={{
        borderTopWidth: 0.5,
        borderTopColor: theme.border,
        ...style,
      }}
    />
  );
};

export default Divider;
