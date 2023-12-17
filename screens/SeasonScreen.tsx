import { useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import useSWR from "swr";
import { API, fetcher } from "../api";
import LayoutDefault from "../layouts";
import { LinearGradient } from "expo-linear-gradient";
import tw from "twrnc";
import { theme } from "../theme";
import Divider from "../components/common/divider";
import { format } from "date-fns";
import Rate from "../components/common/rate";
import { ClockIcon, StarIcon } from "react-native-heroicons/solid";
import OverviewText from "../components/movie-screen/overview/text";

const { width, height } = Dimensions.get("window");
// {
//     "_id":"52b8e06c19c295758c08eff9",
//     "air_date":"2006-10-04",
//     "episodes":[
//        {
//           "air_date":"2006-10-04",
//           "crew":[
//              "Array"
//           ],
//           "episode_number":1,
//           "episode_type":"standard",
//           "guest_stars":[
//              "Array"
//           ],
//           "id":970179,
//           "name":"Rebirth",
//           "overview":"Brilliant but bored high school student Light Yagami suddenly finds himself holding the power of life and death in his hands—the power of the Death Note. He decides to rid the world of evil—by killing off criminals one by one. When the murders start to pile up, genius detective L is on the case, and an epic battle of wits unfolds.",
//           "production_code":"",
//           "runtime":23,
//           "season_number":1,
//           "show_id":13916,
//           "still_path":"/aB8hhRZzqXERPFqNwm7fF8GFpNy.jpg",
//           "vote_average":8,
//           "vote_count":39
//        },
//        {
//           "air_date":"2006-10-11",
//           "crew":[
// {
//     "job": "Writer",
//     "department": "Writing",
//     "credit_id": "52541de519c29570ba01c5fc",
//     "adult": false,
//     "gender": 2,
//     "id": 1223158,
//     "known_for_department": "Writing",
//     "name": "Joshua Safran",
//     "original_name": "Joshua Safran",
//     "popularity": 1.107,
//     "profile_path": "/26XT0gI1N8btsRXgfLSFzrPLXvY.jpg"
//   }
//           ],
//           "episode_number":2,
//           "episode_type":"standard",
//           "guest_stars":[
//              {
//   "character": "Ally",
//   "credit_id": "527f779619c29514fe0356d7",
//   "order": 554,
//   "adult": false,
//   "gender": 1,
//   "id": 20494,
//   "known_for_department": "Acting",
//   "name": "Zoë Bell",
//   "original_name": "Zoë Bell",
//   "popularity": 8.152,
//   "profile_path": "/fDckmfcIrrdcOgyGifVF2FvQtiE.jpg"
// },
//           ],
//           "id":998584,
//           "name":"Confrontation",
//           "overview":"While the world’s criminals continue to drop dead, L meets by computer with representatives from various nations. He requests that a task force be set up in Japan, under the direction of none other than Soichiro Yagami, Light’s father.",
//           "production_code":"",
//           "runtime":23,
//           "season_number":1,
//           "show_id":13916,
//           "still_path":"/63fCP6HZf5EbP6muq2mcYh6Lvc8.jpg",
//           "vote_average":8.3,
//           "vote_count":36
//        },
//     ],
//     "id":1684,
//     "name":"Specials",
//     "overview":"",
//     "poster_path":"/vVUVEqs0KwplqHvv2GyCj2tpMSr.jpg",
//     "season_number":0,
//     "vote_average":0
//  }

const handleRewiteJob = (data: any) => {
  let result: any = {};
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

const SeasonScreen = () => {
  const route = useRoute();

  const { seriesId, seasonNumber } = route.params;

  const { data, isLoading } = useSWR(
    API.getSeason(seriesId, seasonNumber),
    fetcher
  );

  if (!data) {
    return;
  }

  console.log("CREW ~ ", data.episodes[0].crew);
  return (
    <LayoutDefault>
      <Image
        source={{
          uri: API.getImageUrl(data.poster_path),
        }}
        style={{ width, height: height * 0.6 }}
      />
      <LinearGradient
        colors={["transparent", "rgba(23, 23, 23, 0.4)", "rgba(23, 23, 23, 6)"]}
        style={{ width, height: height * 0.4, ...tw`absolute bottom-0` }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
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
      <Text style={tw`p-4 text-[${theme.main}] text-xl font-semibold`}>
        List of episodes ({data.episodes.length})
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.episodes}
        renderItem={({ item: episode }) => (
          <View
            style={{
              width: width * 0.9,
              ...tw`px-4 pb-10`,
            }}
            // key={episode.id}
          >
            <View>
              <Image
                source={{
                  uri: API.getImageUrl(episode.still_path),
                }}
                height={200}
                style={{
                  borderRadius: 10,
                }}
              />
              <View
                style={tw`absolute left-4 -bottom-4 bg-slate-900 rounded-full`}
              >
                <Rate
                  progress={data.vote_average / 10}
                  rate={data.vote_average}
                />
              </View>
            </View>
            <Text
              numberOfLines={2}
              style={tw`text-white text-lg mt-5 font-semibold`}
            >
              {episode.name}
            </Text>
            <View style={tw`flex-row items-center mt-2`}>
              <View style={tw`flex-row items-center mr-6`}>
                <ClockIcon size={14} style={tw`text-slate-400 mr-1`} />
                <OverviewText style={tw`text-sm`}>
                  {episode.runtime} min
                </OverviewText>
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
              <Text style={tw`text-base text-white font-semibold`}>
                Guest starss{" "}
                <Text style={tw`text-slate-400 text-sm`}>
                  ({episode.guest_stars.length})
                </Text>
              </Text>
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
            </View>
          </View>
        )}
      />
    </LayoutDefault>
  );
};

export default SeasonScreen;
