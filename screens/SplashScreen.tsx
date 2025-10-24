import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export default function SplashScreen(): React.ReactElement {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [typedText, setTypedText] = useState("");
  const fullText = "SELAMAT DATANG";

  useEffect(() => {
    // Fade-in animasi
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Rotate animasi logo
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Typing animasi teks
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length) clearInterval(typingInterval);
    }, 100);

    // Navigasi ke Home setelah 2.5 detik
    const timeout = setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timeout);
    };
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/splash.png")}
        style={[styles.logo, { transform: [{ rotate }] }]}
      />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.text}>{typedText}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  text: {
    color: "#FBBF24",
    fontSize: 20,
    fontWeight: "bold",
  },
});
