import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import TopNavigation from "../components/common/top-navigation";
import MovieList from "../components/common/movie-list";

const { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";

const ArtistScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-neutral-900">
      <ScrollView>
        <TopNavigation isDock />
        <View>
          <View
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 1,
            }}
            className="flex-row justify-center"
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-500">
              <Image
                source={require("../assets/icon.png")}
                style={{ height: height * 0.4, width: width * 0.6 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-white text-3xl font-bold text-center">
              Bui Ngoc
            </Text>
            <Text className="text-neutral-500 text-center">
              Ha Dong, Ha Noi
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-sm font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-xs">Female</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-sm font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-xs">2003-02-13</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white text-sm font-semibold">Know for</Text>
              <Text className="text-neutral-300 text-xs">ChuaHme</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white text-sm font-semibold">
                Popularity
              </Text>
              <Text className="text-neutral-300 text-xs">13.23</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400  ">ehhehehe</Text>
          </View>

          {/* {<MovieList data={[1, 2, 3, 4, 5, 6]} title="Movies" />} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default ArtistScreen;
