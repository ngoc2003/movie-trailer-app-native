import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { ClockIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { format } from "date-fns";
import { OverviewInfo } from "../../movie-screen/overview";
import OverviewText from "../../movie-screen/overview/text";
import Divider from "../../common/divider";
import GenreList from "../../movie-screen/overview/genres-list";
import { styles } from "../../../theme";
import { TvShowDetailType } from "../../../types";

interface OverviewProps {
  data: TvShowDetailType;
}

const TvShowOverview = ({ data }: OverviewProps) => {
  return (
    <View style={tw`p-4 pt-2`}>
      <OverviewText style={tw`text-slate-500 text-sm italic mb-1`}>
        {data.tagline}
      </OverviewText>
      <Text style={{ ...styles.text, ...tw` text-2xl font-bold` }}>
        {data.name}
      </Text>

      <View style={tw`flex-row items-center mt-2`}>
        <View style={tw`flex-row items-center mr-6`}>
          <ClockIcon size={14} style={tw`text-slate-400 mr-1`} />
          <OverviewText style={tw`text-sm`}>
            {data.episode_run_time}min
          </OverviewText>
        </View>
        <View style={tw`flex-row items-center`}>
          <StarIcon size={14} style={tw`text-slate-400 mr-1`} />
          <OverviewText style={tw`text-sm`}>{data.vote_average}</OverviewText>
        </View>
      </View>

      <Divider style={{ marginVertical: 12 }} />

      <OverviewText style={tw`text-white text-lg font-semibold mt-2 mb-1`}>
        Overview
      </OverviewText>
      <OverviewText>{data.overview}</OverviewText>

      <Divider style={{ marginVertical: 12 }} />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <OverviewInfo
            label="First air date"
            value={format(new Date(data.first_air_date), "MMMM dd, yyyy")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <OverviewInfo
            label="Genre"
            value={<GenreList genres={data.genres} />}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <OverviewInfo
            label="Last air date"
            value={format(new Date(data.last_air_date), "MMMM dd, yyyy")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <OverviewInfo label="Status" value={data.status} />
        </View>
      </View>

      <Divider style={{ marginVertical: 12 }} />

      <View style={{ width: "100%", ...tw`flex-row mb-4` }}>
        <View style={{ flex: 1 }}>
          <OverviewInfo
            label="Number of episodes"
            value={data.number_of_episodes}
          />
          <OverviewInfo
            label="Number of season"
            value={data.number_of_seasons}
          />
        </View>
        <View style={{ flex: 1 }}>
          <OverviewInfo
            label="Spoken languages"
            value={data.spoken_languages.map(
              (language) => language.english_name
            )}
          />
        </View>
      </View>
      <Divider style={{ marginVertical: 12 }} />
    </View>
  );
};

export default TvShowOverview;
