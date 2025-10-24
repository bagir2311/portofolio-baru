import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useColorScheme,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";

export default function AboutScreen(): React.ReactElement {
  const route = useRoute<RouteProp<RootStackParamList, "About">>();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const language: "id" | "en" = route.params?.language ?? "id";

  const aboutText: Record<"id" | "en", string> = {
    id: `Halo! Saya JASIYI BAGIR RAFSYAHID, seorang pengembang React Native yang bersemangat membangun aplikasi mobile modern dan responsif. Saya suka menggabungkan desain yang bersih dengan fitur interaktif seperti navigasi, dark mode, dan toggle bahasa.

Saya percaya bahwa teknologi harus mudah diakses dan menyenangkan digunakan. Portofolio ini adalah cerminan perjalanan saya dalam belajar, mencoba, dan terus berkembang.

Terima kasih sudah mampir! 😊`,
    en: `Hi! I'm JASIYI BAGIR RAFSYAHID, a passionate React Native developer who loves building modern and responsive mobile apps. I enjoy combining clean design with interactive features like navigation, dark mode, and language toggles.

I believe technology should be accessible and enjoyable. This portfolio reflects my journey of learning, experimenting, and growing.

Thanks for stopping by! 😊`,
  };

  const [typedText, setTypedText] = useState("");
  const fullText = aboutText[language];

  useEffect(() => {
    let index = 0;
    setTypedText(""); // reset saat ganti bahasa
    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) clearInterval(typingInterval);
    }, 20);

    return () => clearInterval(typingInterval);
  }, [language]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? "#1F2937" : "#F9FAFB" },
      ]}
    >
      <Image
        source={require("../assets/foto.png")}
        style={styles.profileImage}
      />
      <Text style={[styles.header, { color: isDark ? "#FBBF24" : "#1E40AF" }]}>
        {language === "id" ? "Tentang Saya" : "About Me"}
      </Text>
      <Text
        style={[
          styles.description,
          { color: isDark ? "#D1D5DB" : "#374151" },
        ]}
      >
        {typedText}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    flexGrow: 1,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
    backgroundColor: "#ccc",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
