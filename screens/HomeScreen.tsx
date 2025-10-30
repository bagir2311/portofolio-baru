import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const TEXTS = {
  id: {
    name: "JAISYI BAGIR RAFSYAHID",
    desc: "Developer React Native yang suka membangun aplikasi interaktif dan desain bersih.",
    project: "Lihat Proyek",
    about: "Tentang Saya",
    contact: "Hubungi Saya",
    skills: "Keahlian",
    blog: "Blog Saya",
    switch: "Ganti ke Bahasa Inggris",
  },
  en: {
    name: "JAISYI BAGIR RAFSYAHID",
    desc: "React Native developer who loves building interactive apps with clean design.",
    project: "View Projects",
    about: "About Me",
    contact: "Contact Me",
    skills: "Skills",
    blog: "My Blog",
    switch: "Switch to Bahasa Indonesia",
  },
};

export default function HomeScreen(): React.ReactElement {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [language, setLanguage] = useState<"id" | "en">("id");

  const t = TEXTS[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const bg = isDark ? "#0F172A" : "#F8FAFC";
  const textPrimary = isDark ? "#F8FAFC" : "#0F172A";
  const textSecondary = isDark ? "#94A3B8" : "#64748B";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ translateY: slideAnim }],
  };

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Animated.View
        style={[
          styles.avatarContainer,
          isDark ? styles.shadowDark : styles.shadowLight,
          animatedStyle,
        ]}
      >
        <Image
          source={require("../assets/foto.png")}
          style={styles.avatar}
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.Text style={[styles.name, { color: textPrimary }, animatedStyle]}>
        {t.name}
      </Animated.Text>

      <Animated.Text style={[styles.desc, { color: textSecondary }, animatedStyle]}>
        {t.desc}
      </Animated.Text>

      <Animated.View style={[styles.buttonGroup, animatedStyle]}>
        <MenuButton
          title={t.project}
          onPress={() => navigation.navigate("Projects", { language })}
          backgroundColor="#3B82F6"
        />
        <MenuButton
          title={t.about}
          onPress={() => navigation.navigate("About", { language })}
          backgroundColor="#F59E0B"
        />
        <MenuButton
          title={t.contact}
          onPress={() => navigation.navigate("Contact", { language })}
          backgroundColor="#10B981"
        />
        <MenuButton
          title={t.skills}
          onPress={() => navigation.navigate("Skills", { language })}
          backgroundColor="#6366F1"
        />
        <MenuButton
          title={t.blog}
          onPress={() => navigation.navigate("Blog", { language })}
          backgroundColor="#F43F5E"
        />
      </Animated.View>

      <TouchableOpacity onPress={toggleLanguage} activeOpacity={0.6} style={styles.langToggle}>
        <Text style={[styles.langText, { color: textSecondary }]}>
          {t.switch}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── MENU BUTTON COMPONENT ───────────────────────────────────
const MenuButton = ({
  title,
  onPress,
  backgroundColor,
}: {
  title: string;
  onPress: () => void;
  backgroundColor: string;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[styles.menuButton, { backgroundColor }]}
  >
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

// ─── STYLES ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  avatarContainer: {
    borderRadius: 70,
    padding: 4,
    marginBottom: 24,
  },
  shadowLight: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  shadowDark: {
    backgroundColor: "#1E293B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  desc: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 36,
    opacity: 0.9,
  },
  buttonGroup: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  menuButton: {
    width: "85%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  menuText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  langToggle: {
    marginTop: 16,
    paddingVertical: 6,
  },
  langText: {
    fontSize: 14,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
