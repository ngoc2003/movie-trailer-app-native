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

interface OverviewProps {
  data: any;
}

// {
//     "adult":false,
//     "backdrop_path":"/2Yfzm5857lprGonYPl30XgEpTry.jpg",
//     "created_by":[

//     ],
//     "episode_run_time":[
//        22
//     ],
//     "first_air_date":"2006-10-04",
//     "genres":[
//        {
//           "id":16,
//           "name":"Animation"
//        },
//        {
//           "id":9648,
//           "name":"Mystery"
//        },
//        {
//           "id":10765,
//           "name":"Sci-Fi & Fantasy"
//        }
//     ],
//     "homepage":"http://www.ntv.co.jp/deathnote/",
//     "id":13916,
//     "in_production":false,
//     "languages":[
//        "ja"
//     ],
//     "last_air_date":"2007-06-27",
//     "last_episode_to_air":{
//        "air_date":"2007-06-27",
//        "episode_number":37,
//        "episode_type":"finale",
//        "id":1146047,
//        "name":"New World",
//        "overview":"Though Mikami has written all the investigators' names in the Death Note, a minute passes and everyone is still alive. Near seizes Mikami's Death Note, and all is at last revealed.",
//        "production_code":"",
//        "runtime":22,
//        "season_number":1,
//        "show_id":13916,
//        "still_path":"/85nG6sUrczzZVATIXP9JJvNMuSo.jpg",
//        "vote_average":8.3,
//        "vote_count":24
//     },
//     "name":"Death Note",
//     "networks":[
//        {
//           "id":57,
//           "logo_path":"/uxaXSoT8K0S2NE5PWsBpHUl3GGU.png",
//           "name":"Nippon TV",
//           "origin_country":"JP"
//        }
//     ],
//     "next_episode_to_air":null,
//     "number_of_episodes":37,
//     "number_of_seasons":1,
//     "origin_country":[
//        "JP"
//     ],
//     "original_language":"ja",
//     "original_name":"DEATH NOTE",
//     "overview":"Light Yagami is an ace student with great prospects—and he’s bored out of his mind. But all that changes when he finds the Death Note, a notebook dropped by a rogue Shinigami death god. Any human whose name is written in the notebook dies, and Light has vowed to use the power of the Death Note to rid the world of evil. But will Light succeed in his noble goal, or will the Death Note turn him into the very thing he fights against?",
//     "popularity":530.074,
//     "poster_path":"/iigTJJskR1PcjjXqxdyJwVB3BoU.jpg",
//     "production_companies":[
//        {
//           "id":3464,
//           "logo_path":"/9k0nr75nwnNeT2MHerf1OXJN0hj.png",
//           "name":"Madhouse",
//           "origin_country":"JP"
//        }
//     ],
//     "production_countries":[
//        {
//           "iso_3166_1":"JP",
//           "name":"Japan"
//        }
//     ],
//     "seasons":[
//        {
//           "air_date":"2006-10-04",
//           "episode_count":37,
//           "id":59776,
//           "name":"Season 1",
//           "overview":"An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.",
//           "poster_path":"/1BloDOEmKxPFzbCIuNCLmCrcx6L.jpg",
//           "season_number":1,
//           "vote_average":7.7
//        }
//     ],
//     "spoken_languages":[
//        {
//           "english_name":"Japanese",
//           "iso_639_1":"ja",
//           "name":"日本語"
//        }
//     ],
//     "status":"Ended",
//     "tagline":"The hunted becomes the hunter!",
//     "type":"Scripted",
//     "vote_average":8.638,
//     "vote_count":3728
//  }

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
