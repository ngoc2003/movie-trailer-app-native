import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Loading from "../components/common/loading";
import tw from "twrnc";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([1, 2, 3, 4, 5]);

  const handleSearch = () => {};

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView style={tw`bg-slate-800 flex-1 flex-col`}>
      <View style={tw`mx-4 my-3`}>
        <View
          style={tw`mb-3 p-1 flex-row justify-between items-center border border-slate-500 rounded-full`}
        >
          <TextInput
            onChangeText={handleTextDebounce}
            placeholder="Search Movie"
            placeholderTextColor={"lightgray"}
            style={tw`pl-4 flex-1 text-base font-semibold text-white leading-normal`}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={tw`rounded-full p-3 bg-slate-500`}
          >
            <XMarkIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-white font-semibold ml-1`}>
          Results ({results.length})
        </Text>
      </View>

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={tw`space-y-3 pt-2`}
        >
          <View style={tw`flex-row justify-between flex-wrap`}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                >
                  <View style={tw`  mb-4`}>
                    <Image
                      source={require("../assets/icon.png")}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                        ...tw`rounded-3x`,
                      }}
                    />
                    <Text style={tw`text-gray-300 ml-1`}>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={tw`flex-row justify-center`}>
          <Image source={require("../assets/icon.png")} style={tw`h-96 w-96`} />
        </View>
      )}
    </SafeAreaView>
  );
}
