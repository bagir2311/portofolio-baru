import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

type Language = "id" | "en";

const texts: Record<Language, { header: string; readMore: string }> = {
  id: {
    header: "Blog Saya",
    readMore: "Baca Selengkapnya",
  },
  en: {
    header: "My Blog",
    readMore: "Read More",
  },
};

const blogs = [
  {
    title: {
      id: "Membangun Portofolio dengan React Native",
      en: "Building a Portfolio with React Native",
    },
    date: "10 Oktober 2025",
    excerpt: {
      id: "Langkah-langkah membuat aplikasi portofolio yang menarik dan interaktif...",
      en: "Steps to build an engaging and interactive portfolio app...",
    },
  },
  {
    title: {
      id: "Tips UI/UX untuk Developer Mobile",
      en: "UI/UX Tips for Mobile Developers",
    },
    date: "5 Oktober 2025",
    excerpt: {
      id: "Bagaimana membuat tampilan aplikasi yang nyaman dan profesional...",
      en: "How to design a comfortable and professional app interface...",
    },
  },
];

export default function BlogScreen({ route }: { route: any }) {
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

      {blogs.map((blog, index) => (
        <View key={index} style={styles.blogBox}>
          <Text
            style={[styles.blogTitle, { color: isDark ? "#FBBF24" : "#1E3A8A" }]}
          >
            {blog.title[lang]}
          </Text>
          <Text
            style={[styles.blogDate, { color: isDark ? "#D1D5DB" : "#6B7280" }]}
          >
            {blog.date}
          </Text>
          <Text
            style={[
              styles.blogExcerpt,
              { color: isDark ? "#D1D5DB" : "#374151" },
            ]}
          >
            {blog.excerpt[lang]}
          </Text>
          <TouchableOpacity>
            <Text
              style={[
                styles.readMore,
                { color: isDark ? "#93C5FD" : "#2563EB" },
              ]}
            >
              {texts[lang].readMore}
            </Text>
          </TouchableOpacity>
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
  blogBox: { marginBottom: 25 },
  blogTitle: { fontSize: 18, fontWeight: "bold" },
  blogDate: { fontSize: 12, marginBottom: 5 },
  blogExcerpt: { fontSize: 14, marginBottom: 5 },
  readMore: { fontSize: 14, fontWeight: "bold" },
});
