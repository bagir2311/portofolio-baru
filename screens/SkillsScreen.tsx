import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

type Language = "id" | "en";

const texts: Record<Language, { header: string; level: string }> = {
  id: {
    header: "Keahlian Saya",
    level: "Tingkat",
  },
  en: {
    header: "My Skills",
    level: "Level",
  },
};

const skills = [
  { name: "React Native", level: "Advanced" },
  { name: "Expo", level: "Advanced" },
  { name: "UI/UX Design", level: "Intermediate" },
  { name: "JavaScript", level: "Advanced" },
  { name: "Firebase", level: "Intermediate" },
];

export default function SkillsScreen({ route }: { route: any }) {
  const { language = "id" } = route.params || {};
  const lang = (language === "en" ? "en" : "id") as Language;
  const isDark = useColorScheme() === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1F2937" : "#F9FAFB" },
      ]}
    >
      <Text style={[styles.header, { color: isDark ? "#FBBF24" : "#1E40AF" }]}>
        {texts[lang].header}
      </Text>

      {skills.map((skill, index) => (
        <View key={index} style={styles.skillBox}>
          <Text
            style={[styles.skillName, { color: isDark ? "#FBBF24" : "#1E3A8A" }]}
          >
            {skill.name}
          </Text>
          <Text
            style={[styles.skillLevel, { color: isDark ? "#D1D5DB" : "#374151" }]}
          >
            {texts[lang].level}: {skill.level}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  skillBox: { marginBottom: 15 },
  skillName: { fontSize: 18, fontWeight: "bold" },
  skillLevel: { fontSize: 14 },
});
