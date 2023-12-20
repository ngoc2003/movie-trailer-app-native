import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { capitalize } from "lodash";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Loading from "../components/common/loading";
import tw from "twrnc";
import { theme } from "../theme";
import Divider from "../components/common/divider";
import useSWR from "swr";
import { API, fetcher } from "../api";
import MovieCard from "../components/common/movie-list/movie-card";
import TvShowItem from "../components/common/tv-show-list/tv-show-item";
import PeopleItemCard from "../components/common/trending-people/trending-people-item";
import { MovieType, PeopleType, TvShowType } from "../types";

const TAB_NAMES = ["movie", "tv", "person"];

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSWR(
    () => API.getSearchResult(searchValue, TAB_NAMES[tabIndex], page),
    fetcher
  );

  useEffect(() => {
    if (data?.results) {
      setResults((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
    setResults([]);
  }, [tabIndex]);

  const onNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={tw`bg-[#15141f] flex-1 flex-col`}>
      <View style={tw`p-4 pb-0`}>
        <View
          style={tw`mb-3 p-1 flex-row justify-between items-center border border-slate-700 rounded-full`}
        >
          <TextInput
            placeholder="Search for movie, tv show, ..."
            placeholderTextColor={"lightgray"}
            style={tw`pl-4 flex-1 text-base font-semibold text-white`}
            onSubmitEditing={(event) => setSearchValue(event.nativeEvent.text)}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`rounded-full p-3 bg-[${theme.main}]`}
          >
            <XMarkIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-row`}>
        {TAB_NAMES.map((tab, index) => (
          <TouchableOpacity
            disabled={isLoading}
            style={tw`flex-1 p-2.5 items-center justify-center border-b ${
              index === tabIndex
                ? `border-b-[${theme.main}] border-b-2`
                : "border-b-slate-700"
            }`}
            key={tab}
            onPress={() => {
              setTabIndex(index);
            }}
          >
            <Text
              style={tw`text-sm ${
                index === tabIndex
                  ? `text-[${theme.main}] font-bold`
                  : "text-slate-400"
              }`}
            >
              {capitalize(tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
        style={tw`pt-2`}
      >
        {results.length > 0 && (
          <View>
            <View style={tw`flex-row justify-center gap-2 flex-wrap`}>
              {TAB_NAMES[tabIndex] === "movie" &&
                results.map((item: MovieType) => (
                  <MovieCard
                    size="small"
                    key={item.id}
                    movie={item}
                    onPress={() =>
                      navigation.navigate("Movie", { id: item.id })
                    }
                  />
                ))}
              {TAB_NAMES[tabIndex] === "tv" &&
                results.map((item: TvShowType) => (
                  <TvShowItem key={item.id} data={item} />
                ))}
              {TAB_NAMES[tabIndex] === "person" &&
                results.map((item: PeopleType, index: number) => (
                  <PeopleItemCard
                    key={item.id}
                    isReverse={index % 2 == 1}
                    data={item}
                  />
                ))}
            </View>
            {page < data?.total_pages && (
              <TouchableOpacity
                onPress={onNextPage}
                disabled={isLoading}
                style={tw`bg-[${theme.main}] flex-1 p-3.5 my-2 rounded-sm`}
              >
                <Text style={tw`text-white text-center text-base`}>
                  See more results
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {isLoading && (
          <Loading style={{ height: 100, ...tw`bg-transparent` }} />
        )}
        {!isLoading && !results.length && (
          <View style={tw`flex-row justify-center h-[100] items-center`}>
            <Text style={tw`text-slate-400 font-semibold`}>
              No data founded
            </Text>
          </View>
        )}
      </ScrollView>

      <View>
        <Divider style={tw`border-t-slate-700`} />
        <Text style={tw`text-center text-slate-400 my-4 font-semibold ml-1`}>
          <Text style={tw`font-semibold text-[${theme.main}]`}>
            {data?.total_results ?? 0}
          </Text>{" "}
          results founded
        </Text>
      </View>
    </SafeAreaView>
  );
}
