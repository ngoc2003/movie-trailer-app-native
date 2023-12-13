import React from "react";
import { Circle } from "react-native-progress";
import { theme } from "../../../theme";
import { Text } from "react-native";
import tw from "twrnc";

type Size = "small" | "normal";

enum SizeEnum {
  "small" = 38,
  "normal" = 45,
}

interface RateProps {
  rate: number;
  progress: number;
  size?: Size;
}
const Rate = ({ progress, rate, size = "normal" }: RateProps) => {
  if (!progress || !rate) {
    return null;
  }

  return (
    <Circle
      color={theme.main}
      borderColor="transparent"
      unfilledColor="#ef588353"
      showsText
      progress={progress}
      size={SizeEnum[size]}
      thickness={3}
      formatText={() => (
        <Text style={tw`font-bold text-sm text-white`}>{rate.toFixed(1)}</Text>
      )}
    />
  );
};

export default Rate;
