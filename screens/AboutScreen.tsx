import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AboutScreen(): React.ReactElement {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const { language } = route.params as { language: "id" | "en" };

  const texts = {
    id: {
      title: "Tentang Saya",
      desc:
        "Saya JASIYI, seorang developer React Native yang suka membangun aplikasi interaktif dan desain yang bersih. Saya senang belajar hal baru, menyelesaikan error dengan sabar, dan terus memperbaiki portofolio saya.",
      back: "← Kembali ke Home",
    },
    en: {
      title: "About Me",
      desc:
        "I'm JASIYI, a React Native developer who loves building interactive apps with clean design. I enjoy learning new things, solving errors patiently, and continuously improving my portfolio.",
      back: "← Back to Home",
    },
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#111827" : "#F0F9FF" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#FBBF24" : "#0C4A6E" }]}>
        {texts[language].title}
      </Text>
      <Text
        style={[
          styles.description,
          { color: isDark ? "#D1D5DB" : "#1E3A8A" },
        ]}
      >
        {texts[language].desc}
      </Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>{texts[language].back}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  backButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FBBF24",
    borderRadius: 8,
  },
  backText: {
    color: "#1F2937",
    fontWeight: "bold",
    fontSize: 16,
  },
});
