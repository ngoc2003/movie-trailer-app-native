import { format } from "date-fns";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import tw from "twrnc";
import { TrailerVideoType } from "../../../../types";

interface TrailerVideoItemProps {
  data: TrailerVideoType;
}

const { width } = Dimensions.get("window");

const TrailerVideoItem = ({ data }: TrailerVideoItemProps) => {
  return (
    <View style={{ marginRight: 12 }}>
      <YoutubePlayer
        height={180}
        play={false}
        videoId={data.key}
        allowWebViewZoom
        width={width * 0.9}
      />
      <View style={{ paddingHorizontal: 4 }}>
        <Text numberOfLines={2} style={tw`text-neutral-400 mt-4 font-semibold`}>
          {data.name}
        </Text>
        <Text numberOfLines={2} style={tw`text-neutral-500 mt-2`}>
          Published at: {format(new Date(data.published_at), "dd-MM-yyyy")}
        </Text>
      </View>
    </View>
  );
};

export default TrailerVideoItem;
