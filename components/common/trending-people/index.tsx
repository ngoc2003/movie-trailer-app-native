import React from "react";
import { FlatList, Text, View } from "react-native";
import tw from "twrnc";
import { PeopleType } from "../../../types";
import PeopleItemCard from "./trending-people-item";

interface TrendingPeppleProps {
  data: PeopleType[];
}

const TrendingPeople = ({ data }: TrendingPeppleProps) => {
  return (
    <View style={{ ...tw`my-6 bg-opacity-30 py-4 pb-8 bg-[#211f30]` }}>
      <Text style={tw`text-center text-xl text-white mx-4 mb-5 font-bold`}>
        Trending people
      </Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={({ item: person }) => <PeopleItemCard data={person} />}
      />
    </View>
  );
};

export default TrendingPeople;
