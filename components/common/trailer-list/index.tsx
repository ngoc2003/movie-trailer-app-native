import React from "react";
import { Dimensions, Text, View } from "react-native";
import tw from "twrnc";
import YoutubePlayer from "react-native-youtube-iframe";
import Carousel from "react-native-snap-carousel-v4";
import { styles } from "../../../theme";
import { format } from "date-fns";

interface TrailerListProps {
  text: string;
  data: any;
}

const { width } = Dimensions.get("window");

const TrailerVideoItem = ({ data }) => {
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

const TrailerList = ({
  text = "List movie trailer",
  data,
}: TrailerListProps) => {
  return (
    <View>
      <Text
        style={{
          ...styles.text,
          marginLeft: 16,
          ...tw`text-xl mb-4 font-semibold`,
        }}
      >
        - {text}
      </Text>
      <Carousel
        data={data}
        renderItem={({ item }) => {
          return <TrailerVideoItem data={item} />;
        }}
        vertical={false}
        firstItem={0}
        sliderWidth={width}
        itemWidth={width * 0.9}
        slideStyle={{
          display: "flex",
          alignItems: "center",
          ...tw`animate-pulse`,
        }}
      />
    </View>
  );
};

export default TrailerList;

// {
//     "id":238,
//     "results":[
//        {
//           "id":"656b9c210859b400ff7519bc",
//           "iso_3166_1":"US",
//           "iso_639_1":"en",
//           "key":"evl5ai7Mg7w",
//           "name":"Don Corleone Gets Shot",
//           "official":true,
//           "published_at":"2023-12-02T16:59:55.000Z",
//           "site":"YouTube",
//           "size":1080,
//           "type":"Clip"
//        },
//     ]
//  }
