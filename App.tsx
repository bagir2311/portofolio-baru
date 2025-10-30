import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import ProjectsScreen from "./screens/ProjectsScreen"; // Ganti ProjectsStack jadi ProjectsScreen
import ContactScreen from "./screens/ContactScreen";
import SkillsScreen from "./screens/SkillsScreen";
import BlogScreen from "./screens/BlogScreen";

export type RootStackParamList = {
  Splash: undefined;
  Home: { language: "id" | "en" };
  Projects: { language: "id" | "en" };
  About: { language: "id" | "en" };
  Contact: { language: "id" | "en" };
  Skills: { language: "id" | "en" };
  Blog: { language: "id" | "en" };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ language: "id" }}
        />
        <Stack.Screen
          name="Projects"
          component={ProjectsScreen}
          initialParams={{ language: "id" }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          initialParams={{ language: "id" }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          initialParams={{ language: "id" }}
        />
        <Stack.Screen
          name="Skills"
          component={SkillsScreen}
          initialParams={{ language: "id" }}
        />
        <Stack.Screen
          name="Blog"
          component={BlogScreen}
          initialParams={{ language: "id" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
