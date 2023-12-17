import { format } from "date-fns";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import tw from "twrnc";
import { TrailerVideoType } from "../../../../types";
import { theme } from "../../../../theme";

interface TrailerVideoItemProps {
  data: TrailerVideoType;
}

const { width } = Dimensions.get("window");

const TrailerVideoItem = ({ data }: TrailerVideoItemProps) => {
  return (
    <View style={{ marginRight: 12 }}>
      <YoutubePlayer
        height={170}
        play={false}
        videoId={data.key}
        allowWebViewZoom
        width={290}
      />
      <View style={{ paddingHorizontal: 4 }}>
        <Text numberOfLines={2} style={tw`text-slate-400 mt-4 font-semibold`}>
          {data.name}
        </Text>
        <Text numberOfLines={2} style={tw`text-slate-500 mt-2`}>
          Published at: {format(new Date(data.published_at), "dd-MM-yyyy")}
        </Text>
      </View>
    </View>
  );
};

export default TrailerVideoItem;

TrailerVideoItem.Skeleton = function () {
  return (
    <View style={{ marginRight: 12, ...tw` ` }}>
      <View
        style={{
          ...tw`bg-[${theme.skeleton}]`,
          height: 170,
          width: width * 0.9,
        }}
      />
    </View>
  );
};
