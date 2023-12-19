import React, { useState } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { theme } from "../../../theme";

export type personalInformation = Record<string, string | number>[];

interface BasicInformationProps {
  personalInformation: personalInformation;
  alsoKnownAs: string[];
  biography: string;
}

const BasicInformation = ({
  personalInformation,
  alsoKnownAs,
  biography,
}: BasicInformationProps) => {
  const [isSeeMoreBio, setIsSeeMoreBio] = useState<boolean>(false);

  return (
    <View style={tw`p-4 pt-0`}>
      <View>
        <Text style={tw`text-xl text-white font-semibold mb-2`}>
          Personal Information
        </Text>
        <View style={tw`flex-row flex-wrap`}>
          {personalInformation.map((information) => (
            <View
              key={information.title}
              style={{ width: "50%", marginBottom: 10 }}
            >
              <Text style={tw`text-slate-400 text-base`}>
                {information.title}
              </Text>
              <Text style={tw`text-slate-500 text-sm`}>{information.text}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text style={tw`text-xl text-white font-semibold mb-2`}>
          Also know as
        </Text>
        <Text style={tw`text-slate-500 text-sm mb-2`}>
          {alsoKnownAs.join(", ")}
        </Text>
      </View>
      <View>
        <Text style={tw`text-xl text-white font-semibold mb-2`}>Biography</Text>
        <Text style={tw`text-slate-500 text-sm `}>
          {isSeeMoreBio ? biography + " " : biography.slice(0, 450) + "... "}

          <Text
            onPress={() => setIsSeeMoreBio(!isSeeMoreBio)}
            style={tw`text-[${theme.main}] font-semibold text-sm`}
          >
            See {isSeeMoreBio ? "less" : "more"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default BasicInformation;
