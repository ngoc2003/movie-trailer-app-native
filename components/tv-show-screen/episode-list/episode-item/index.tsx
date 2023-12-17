import React from "react";

import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { API } from "../../../../api";
import Rate from "../../../common/rate";
import { ClockIcon, StarIcon } from "react-native-heroicons/solid";
import OverviewText from "../../../movie-screen/overview/text";
import Divider from "../../../common/divider";
import { styles } from "../../../../theme";
import { CrewType, EpisodeType } from "../../../../types";

interface EpisodeItemProps {
  data: EpisodeType;
  voteAverage: number;
}

const { width } = Dimensions.get("window");

const handleRewiteJob = (data: CrewType[]) => {
  let result: Record<string, string[]> = {};
  data.forEach((item: any) => {
    if (!result[item.job]) {
      result[item.job] = [item.name];
    } else {
      result[item.job].push(item.name);
    }
  });

  let resultArray = [];

  for (let job in result) {
    resultArray.push({
      job: job,
      names: result[job],
    });
  }
  return resultArray;
};

const EpisodeItem = ({ data: episode, voteAverage }: EpisodeItemProps) => {
  return (
    <View
      style={{
        width: width * 0.9,
        ...tw`px-4 pb-10`,
      }}
      key={episode.id}
    >
      <View>
        <Image
          source={{
            uri: episode.still_path
              ? API.getImageUrl(episode.still_path)
              : "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2022/09/hinh-nen-dien-thoai-cute-2022-19-696x1237.jpg?fit=700%2C20000&quality=95&ssl=1",
          }}
          height={200}
          style={{
            borderRadius: 10,
          }}
        />
        <View style={tw`absolute left-4 -bottom-4 bg-slate-900 rounded-full`}>
          <Rate progress={voteAverage / 10} rate={voteAverage} />
        </View>
      </View>
      <Text numberOfLines={2} style={tw`text-white text-lg mt-5 font-semibold`}>
        {episode.name}
      </Text>
      <View style={tw`flex-row items-center mt-2`}>
        <View style={tw`flex-row items-center mr-6`}>
          <ClockIcon size={14} style={tw`text-slate-400 mr-1`} />
          <OverviewText style={tw`text-sm`}>{episode.runtime} min</OverviewText>
        </View>
        <View style={tw`flex-row items-center`}>
          <StarIcon size={14} style={tw`text-slate-400 mr-1`} />
          <OverviewText style={tw`text-sm`}>
            {episode.vote_average}
          </OverviewText>
        </View>
      </View>
      <Text numberOfLines={3} style={tw`text-slate-400 mt-1 text-sm`}>
        {episode.overview}
      </Text>
      <Divider style={tw`my-4`} />
      <TouchableOpacity>
        <Text style={{ ...styles.text, ...tw`font-bold text-right text-sm` }}>
          See more
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={tw`text-base text-white font-semibold`}>
          Crew{" "}
          <Text style={tw`text-slate-400 text-sm`}>
            ({episode.crew.length})
          </Text>
        </Text>
        {handleRewiteJob(episode.crew)?.map((crew) => (
          <View key={crew.job}>
            <Text style={tw`font-semibold text-sm text-slate-400 mt-1`}>
              {crew.job} by:{" "}
              <Text style={tw`font-light text-slate-500 `}>
                {crew.names.join(", ")}
              </Text>
            </Text>
          </View>
        ))}
      </View>
      <Divider style={tw`my-4`} />
      <View>
        <Text style={tw`text-base text-white font-semibold mb-4`}>
          Guest starss{" "}
          <Text style={tw`text-slate-400 text-sm`}>
            ({episode.guest_stars.length})
          </Text>
        </Text>
        <ScrollView
          style={{ maxHeight: 250 }}
          showsVerticalScrollIndicator={false}
        >
          {episode.guest_stars?.map((star) => (
            <View
              key={star.id}
              style={{ flexDirection: "row", marginBottom: 10 }}
            >
              <Image
                source={{
                  uri: API.getImageUrl(star.profile_path),
                }}
                width={40}
                height={40}
                style={{ borderRadius: 10, marginRight: 10 }}
              />
              <View>
                <Text style={tw`font-semibold text-sm text-slate-400 mt-1`}>
                  {star.name}
                </Text>
                <Text style={tw`font-light text-slate-500`}>
                  {star.character}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default EpisodeItem;
