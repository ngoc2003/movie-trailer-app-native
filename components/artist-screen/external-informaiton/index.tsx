import React from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { ExternalInformationResponse } from "../../../types";

interface ExternalInformationProp {
  data: ExternalInformationResponse;
}
const ExternalInformation = ({ data }: ExternalInformationProp) => {
  const linkList = [
    {
      label: "Facebook",
      src: require("../../../assets/icons/Facebook.png"),
      id: data?.facebook_id ?? null,
    },
    {
      label: "Instagram",
      src: require("../../../assets/icons/Instagram.png"),
      id: data?.instagram_id ?? null,
    },
    {
      label: "Twitter",
      src: require("../../../assets/icons/Twitter.png"),
      id: data?.twitter_id ?? null,
    },
  ];

  const handleOpenWeb = (label: string, id: string) => {
    Linking.openURL(`https://www.${label.toLowerCase()}.com/${id}`);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 12,
      }}
    >
      {linkList.length > 0 &&
        linkList
          .filter((link) => link.id)
          .map((link) => (
            <TouchableOpacity
              key={link.label}
              onPress={() => handleOpenWeb(link.label, link.id!)}
              style={tw`p-1 mx-1 rounded-md`}
            >
              <Image source={link.src} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          ))}
    </View>
  );
};

export default ExternalInformation;
