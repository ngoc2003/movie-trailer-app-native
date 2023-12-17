import React from "react";
import { Text, TextStyle } from "react-native";
import tw from "twrnc";

interface OverviewTextProps {
  style?: TextStyle;
  children: any;
}

const OverviewText = ({ style, children }: OverviewTextProps) => {
  return (
    <Text style={{ ...tw`text-slate-400 text-sm`, ...style }}>{children}</Text>
  );
};

export default OverviewText;
