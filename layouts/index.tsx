import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "twrnc";

interface LayoutDefaultProp {
  children: ReactNode;
}

const LayoutDefault = ({ children }: LayoutDefaultProp) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();

  return (
    <View style={tw`flex-1 bg-[#15141f]`}>
      <SafeAreaView style={tw`ios:mb-2 android:mb-3`}>
        <StatusBar translucent={false} style="dark" />
        <View style={tw`flex-row justify-between items-center mx-4 pt-3 pb-2`}>
          {route.name !== "Home" && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeftIcon size={30} strokeWidth={2} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image
              source={require("../assets/logo.png")}
              style={tw`h-8 w-40`}
            />
            {/* <Text style={tw`text-white text-3xl font-bold`}>
              <Text style={styles.text}>TL</Text> Movies
            </Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsHorizontalScrollIndicator
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default LayoutDefault;
