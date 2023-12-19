import React, { ReactNode } from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { API } from "../../../../api";
import { styles, theme } from "../../../../theme";
import { format } from "date-fns";
import { MovieType } from "../../../../types";
import Rate from "../../rate";
import tw from "twrnc";

type MovieCardSize = "normal" | "small";

interface MovieCardProps {
  movie: MovieType;
  onPress: () => void;
  size?: MovieCardSize;
  children?: ReactNode;
}

let { width, height } = Dimensions.get("window");

const ATTR = {
  normal: {
    image: {
      width: width * 0.7,
      height: height * 0.5,
    },
    rate: {},
    information: {
      title: {
        style: tw`text-lg`,
      },
      date: {
        style: tw`text-sm`,
      },
    },
  },
  small: {
    image: {
      width: 150,
      height: 200,
    },
    rate: {
      size: "small",
    },
    information: {
      title: {
        style: {
          maxWidth: 150,
          ...tw`text-sm`,
        },
      },
      date: {
        style: tw`text-xs`,
      },
    },
  },
};

const MovieCard = ({
  movie,
  onPress,
  size = "normal",
  children,
}: MovieCardProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={tw`mx-2 mb-4`}>
        <View>
          <Image
            source={{
              uri: movie.poster_path
                ? API.getImageUrl(movie.poster_path)
                : "https://us.123rf.com/450wm/infadel/infadel1712/infadel171200119/91684826-a-black-linear-photo-camera-logo-like-no-image-available.jpg?ver=6",
            }}
            style={{ ...ATTR[size].image, ...tw`rounded-3xl  ` }}
          />
          <View style={tw`absolute left-4 -bottom-4 bg-slate-900 rounded-full`}>
            <Rate
              progress={movie.vote_average / 10}
              rate={movie.vote_average}
              {...(ATTR[size].rate as any)}
            />
          </View>
        </View>
        <View style={tw`pt-4`}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              ...styles.text,
              ...ATTR[size].information.title.style,
              ...tw`font-bold`,
            }}
          >
            {movie.title}
          </Text>
          <Text
            style={{
              ...ATTR[size].information.date.style,
              ...tw`text-slate-500 mt-0.5`,
            }}
          >
            {movie?.release_date
              ? format(new Date(movie.release_date), "MMMM dd, yyyy")
              : "Not released yet"}
          </Text>
        </View>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;

interface MovieCardSkeleton {
  size?: MovieCardSize;
}

MovieCard.Skeleton = function ({ size = "normal" }: MovieCardSkeleton) {
  return (
    <View
      style={{
        ...tw`bg-[${theme.skeleton}] rounded-3xl py-4 mx-2`,
        ...ATTR[size].image,
      }}
    ></View>
  );
};
