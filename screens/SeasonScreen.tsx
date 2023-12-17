import { useRoute } from "@react-navigation/native";
import React, { memo } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import useSWR from "swr";
import { API, fetcher } from "../api";
import LayoutDefault from "../layouts";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { theme } from "../theme";
import Divider from "../components/common/divider";
import { format } from "date-fns";
import Loading from "../components/common/loading";
import EpisodeList from "../components/tv-show-screen/episode-list";
import { ListEpisodeResponse } from "../types";

const { width, height } = Dimensions.get("window");

const SeasonScreen = () => {
  const route = useRoute();

  const { seriesId, seasonNumber } = route.params;

  const { data, isLoading } = useSWR<ListEpisodeResponse>(
    API.getSeason(seriesId, seasonNumber),
    fetcher
  );

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <LayoutDefault>
      <View>
        <Image
          source={{
            uri: API.getImageUrl(data.poster_path),
          }}
          style={{ width, height: height * 0.6 }}
        />
        <LinearGradient
          colors={[
            "transparent",
            "rgba(23, 23, 23, 0.4)",
            "rgba(23, 23, 23, 6)",
          ]}
          style={{ width, height: height * 0.4, ...tw`absolute bottom-0` }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>
      <View style={tw` px-4`}>
        <Text style={tw`text-[${theme.main}] text-2xl font-semibold pt-4`}>
          {data.name} - Season {data.season_number}
        </Text>
        {data?.air_date && (
          <Text
            style={{
              ...tw`text-slate-500 mt-0.5`,
            }}
          >
            Air date: {format(new Date(data.air_date), "MMMM dd, yyyy")}
          </Text>
        )}
      </View>
      <Divider style={{ marginVertical: 12 }} />
      {data.overview && (
        <View>
          <View style={tw`px-4 pt-2`}>
            <Text style={tw`text-white pb-1`}>Overview</Text>
            <Text style={tw`text-slate-500  text-base`}>{data.overview}</Text>
          </View>
          <Divider style={{ marginVertical: 12 }} />
        </View>
      )}
      <EpisodeList voteAverage={data.vote_average} data={data.episodes} />
    </LayoutDefault>
  );
};

export default SeasonScreen;
