import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { styles } from "../../../theme";
import { ClockIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import Divider from "../../common/divider";
import { format } from "date-fns";
import OverviewText from "./text";
import GenreList from "./genres-list";
import { MovieDetailType } from "../../../types";

interface OverviewProps {
  data: MovieDetailType;
}

const Overview = ({ data }: OverviewProps) => {
  return (
    <View style={tw`p-4 pt-2`}>
      <OverviewText style={tw`text-slate-500 text-sm italic mb-1`}>
        {data.tagline}
      </OverviewText>
      <Text style={{ ...styles.text, ...tw` text-2xl font-bold` }}>
        {data.title}
      </Text>

      <View style={tw`flex-row items-center mt-2`}>
        <View style={tw`flex-row items-center mr-6`}>
          <ClockIcon size={14} style={tw`text-slate-400 mr-1`} />
          <OverviewText style={tw`text-sm`}>{data.runtime}min</OverviewText>
        </View>
        <View style={tw`flex-row items-center`}>
          <StarIcon size={14} style={tw`text-slate-400 mr-1`} />
          <OverviewText style={tw`text-sm`}>{data.vote_average}</OverviewText>
        </View>
      </View>

      <Divider style={{ marginVertical: 12 }} />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <OverviewInfo
            label="Release date"
            value={format(new Date(data.release_date), "MMMM dd, yyyy")}
          />
        </View>
        <View style={{ flex: 1 }}>
          <OverviewInfo
            label="Genre"
            value={<GenreList genres={data.genres} />}
          />
        </View>
      </View>

      <Divider style={{ marginVertical: 12 }} />

      <OverviewText style={tw`text-white text-lg font-semibold mt-2 mb-1`}>
        Overview
      </OverviewText>
      <OverviewText>{data.overview}</OverviewText>

      <Divider style={{ marginVertical: 12 }} />

      <View style={{ width: "100%", ...tw`flex-row mb-4` }}>
        <View style={{ flex: 1 }}>
          <OverviewInfo label="Status" value={data.status} />
          <OverviewInfo
            label="Original Language"
            value={data.original_language}
          />
        </View>
        <View style={{ flex: 1 }}>
          <OverviewInfo label="Budget" value={data.budget} />
          <OverviewInfo label="Revenue" value={data.revenue} />
        </View>
      </View>
    </View>
  );
};

export default Overview;

interface OverviewInfoProps {
  label: string;
  value: string | ReactNode;
}

export const OverviewInfo = ({ label, value }: OverviewInfoProps) => {
  return (
    <View style={tw`my-2 mb-3`}>
      <OverviewText style={tw`text-white font-semibold text-base`}>
        {label}
      </OverviewText>
      <OverviewText style={tw`mt-0.5`}>{value}</OverviewText>
    </View>
  );
};
