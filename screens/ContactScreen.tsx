import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Linking,
} from "react-native";

type Language = "id" | "en";

const texts: Record<Language, { header: string; name: string; email: string; message: string; send: string }> = {
  id: {
    header: "Hubungi Saya",
    name: "Nama",
    email: "Email",
    message: "Pesan",
    send: "Kirim",
  },
  en: {
    header: "Contact Me",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
  },
};

export default function ContactScreen({ route }: { route: any }) {
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

      <TextInput
        placeholder={texts[lang].name}
        style={[
          styles.input,
          { backgroundColor: isDark ? "#374151" : "#FFFFFF" },
        ]}
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
      />

      <TextInput
        placeholder={texts[lang].email}
        style={[
          styles.input,
          { backgroundColor: isDark ? "#374151" : "#FFFFFF" },
        ]}
        keyboardType="email-address"
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
      />

      <TextInput
        placeholder={texts[lang].message}
        style={[
          styles.input,
          { height: 100, backgroundColor: isDark ? "#374151" : "#FFFFFF" },
        ]}
        multiline
        placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL("mailto:jasiyi@example.com")}
      >
        <Text style={styles.buttonText}>{texts[lang].send}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
