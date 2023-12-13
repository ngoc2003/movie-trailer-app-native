import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/movie-screen/cast";
import MovieList from "../components/common/movie-list";
import TopNavigation from "../components/common/top-navigation";
import tw from "twrnc";

const ios = Platform.OS == "ios";

const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3]);
  console.log(id);
  useEffect(() => {
    // call api
  }, []);

  return (
    <View style={tw`flex-1 bg-neutral-900`}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <TopNavigation />

        <View>
          <Image
            source={require("../assets/icon.png")}
            style={{ width, height: height * 0.6 }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(23, 23, 23, 0.8)",
              "rgba(23, 23, 23, 1)",
            ]}
            style={{ width, height: height * 0.4, ...tw`absolute bottom-0` }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>

        <View
          style={{
            marginTop: -height * 0.1,
            ...tw`space-y-3`,
          }}
        >
          <Text
            style={tw`text-white text-center text-3xl font-bold tracking-wider`}
          >
            Movie name
          </Text>
          <Text style={tw`text-neutral-400 font-semibold text-center`}>
            Release - 2020 - 170min
          </Text>
          <View style={tw`flex-row items-center justify-center mx-2`}>
            {["Action", "Thrill", "Comedy"].map((item, index) => (
              <Text
                key={item}
                style={tw`text-neutral-400 font-semibold text-base text-center`}
              >
                {item}
                {index !== ["Action", "Thrill", "Comedy"].length - 1 && (
                  <Text> - </Text>
                )}
              </Text>
            ))}
          </View>

          <Text style={tw`text-neutral-400 mx-4 tracking-wide`}>
            Description
          </Text>
        </View>

        {/* <Cast data={cast} /> */}
        {/* <MovieList title="Similar movies" data={[1, 2, 3]} /> */}
      </ScrollView>
    </View>
  );
};

export default MovieScreen;
