import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { View } from "react-native";
import MovieScreen from "../screens/MovieScreen";
import ArtistScreen from "../screens/ArtistScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const options = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={options} />
        <Stack.Screen name="Movie" component={MovieScreen} options={options} />
        <Stack.Screen
          name="Artist"
          component={ArtistScreen}
          options={options}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
