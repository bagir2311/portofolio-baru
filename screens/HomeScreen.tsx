import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen(): React.ReactElement {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [language, setLanguage] = useState<"id" | "en">("id");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const texts = {
    id: {
      name: "JAISYI BAGIR RAFSYAHID",
      desc: "Developer React Native yang suka membangun aplikasi interaktif dan desain bersih.",
      project: "Lihat Proyek",
      about: "Tentang Saya",
      switch: "Ganti ke Bahasa Inggris",
    },
    en: {
      name: "JAISYI BAGIR RAFSYAHID",
      desc: "React Native developer who loves building interactive apps with clean design.",
      project: "View Projects",
      about: "About Me",
      switch: "Switch to Bahasa Indonesia",
    },
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1F2937" : "#F0F4FF" },
      ]}
    >
      <Image source={require("../assets/foto.png")} style={styles.avatar} />
      <Text style={[styles.name, { color: isDark ? "#FBBF24" : "#1E3A8A" }]}>
        {texts[language].name}
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: isDark ? "#D1D5DB" : "#475569" },
        ]}
      >
        {texts[language].desc}
      </Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing}>
          <Button
            title={texts[language].project}
            onPress={() => navigation.navigate("Projects", { language })}
            color="#2563EB"
          />
        </View>
        <View style={styles.buttonSpacing}>
          <Button
            title={texts[language].about}
            onPress={() => navigation.navigate("About", { language })}
            color="#F59E0B"
          />
        </View>
        <TouchableOpacity onPress={toggleLanguage}>
          <Text style={styles.switchText}>{texts[language].switch}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonSpacing: {
    marginBottom: 15,
    width: "80%",
  },
  switchText: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748B",
    textDecorationLine: "underline",
  },
});
