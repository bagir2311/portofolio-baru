import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ProjectsStack from "./screens/ProjectsScreen";
import AboutScreen from "./screens/AboutScreen";

// ✅ Tambahkan parameter 'language' ke Projects dan About
export type RootStackParamList = {
  Home: undefined;
  Projects: { language: "id" | "en" };
  About: { language: "id" | "en" };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen
          name="Projects"
          component={ProjectsStack}
          initialParams={{ language: "id" }} // fallback default
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
