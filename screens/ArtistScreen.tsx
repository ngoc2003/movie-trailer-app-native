import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import LayoutDefault from "../layouts";

import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import { API, fetcher } from "../api";
import useSWR from "swr";
import BasicInformation from "../components/artist-screen/basic-information";
import ExternalInformation from "../components/artist-screen/external-informaiton";
import Divider from "../components/common/divider";
import {
  CombinedCreditOfArtistResponse,
  DetailArtistType,
  ExternalInformationResponse,
} from "../types";
import { theme } from "../theme";
import CombinedCreditList from "../components/artist-screen/combined-credit-list";
import Loading from "../components/common/loading";

const { width, height } = Dimensions.get("window");

const ArtistScreen = () => {
  const route = useRoute();

  const { id } = route.params;
  const { data } = useSWR<DetailArtistType>(
    () => API.getDetail(id, "person"),
    fetcher
  );

  const { data: externalInformation } = useSWR<ExternalInformationResponse>(
    () => API.getExternalIdsOfPerson(id),
    fetcher
  );
  const { data: combinedCredit } = useSWR<CombinedCreditOfArtistResponse>(
    () => API.getCombinedCreditOfArtist(id),
    fetcher
  );

  if (!data || !externalInformation || !combinedCredit) {
    return <Loading />;
  }

  const personalInformation = [
    {
      title: "Know for",
      text: data.known_for_department,
    },
    {
      title: "Popularity",
      text: data.popularity,
    },
    {
      title: "Birthday",
      text: data.birthday,
    },
    {
      title: "Death day",
      text: data.deathday,
    },
  ];

  return (
    <LayoutDefault>
      <View>
        <View>
          <Image
            source={{
              uri: API.getImageUrl(data.profile_path),
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
        <View style={tw`mt-6`}>
          <Text style={tw`text-white text-3xl font-bold text-center`}>
            {data.name}
          </Text>
          <Text style={tw`text-slate-500 mt-0.5 text-center`}>
            {data.place_of_birth}
          </Text>
        </View>
        <ExternalInformation data={externalInformation} />
        <Divider style={tw`my-4`} />
        <BasicInformation
          alsoKnownAs={data.also_known_as}
          personalInformation={personalInformation}
          biography={data.biography}
        />
        <Divider style={tw`my-4`} />
        <Text style={tw`text-[${theme.main}]  pb-4 pl-4 text-xl font-semibold`}>
          Movie of this artist
        </Text>
        <CombinedCreditList data={combinedCredit?.cast ?? []} />
      </View>
    </LayoutDefault>
  );
};

export default ArtistScreen;
