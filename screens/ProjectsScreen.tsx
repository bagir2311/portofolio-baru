import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Linking,
    useColorScheme,
    Animated,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";

type RootStackParamList = {
    Projects: { language: "id" | "en" };
    ProjectDetail: {
        title: string;
        description: string;
        logo: any;
        github: string;
        language: "id" | "en";
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const projects = [
    {
        id: "1",
        title: { id: "Aplikasi PARKIRAJA", en: "PARKIRAJA App" },
        description: { id: "Aplikasi pencari parkir onlen.", en: "Online parking finder app." },
        logo: require("../assets/3.png"),
        github: "https://github.com/bagir2311/Parkir-APP.git",
    },
    {
        id: "2",
        title: { id: "Website Portofolio", en: "Portfolio Website" },
        description: { id: "Website pribadi untuk menampilkan karya dan kontak.", en: "Personal website to showcase work and contact info." },
        logo: require("../assets/2.png"),
        github: "https://github.com/jasiyi/website-portofolio",
    },
    {
        id: "3",
        title: { id: "WEB PARKIRAJA", en: "PARKIRAJA Web" },
        description: { id: "Website untuk PARKIRAJA.", en: "Website for PARKIRAJA." },
        logo: require("../assets/1.png"),
        github: "https://github.com/bagir2311/UAS-PEM_WEB.gitw",
    },
];

function ProjectCard({
    item,
    index,
    language,
    isDark,
    onPress,
}: {
    item: typeof projects[0];
    index: number;
    language: "id" | "en";
    isDark: boolean;
    onPress: () => void;
}) {
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleAnim, { toValue: 1, duration: 400, delay: index * 120, useNativeDriver: true }),
            Animated.timing(opacityAnim, { toValue: 1, duration: 400, delay: index * 120, useNativeDriver: true }),
        ]).start();
    }, [index, scaleAnim, opacityAnim]);

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
            <TouchableOpacity
                style={[styles.card, { backgroundColor: isDark ? "#374151" : "#E0E7FF" }]}
                onPress={onPress}
            >
                <Image source={item.logo} style={styles.logo} />
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: isDark ? "#FBBF24" : "#1E3A8A" }]}>
                        {item.title[language]}
                    </Text>
                    <Text style={[styles.description, { color: isDark ? "#D1D5DB" : "#374151" }]}>
                        {item.description[language]}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

export function ProjectsScreen(): React.ReactElement {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Projects">>();
    const route = useRoute<RouteProp<RootStackParamList, "Projects">>();
    const theme = useColorScheme();
    const isDark = theme === "dark";
    const { language = "id" } = route.params || { language: "id" };

    const texts = { id: { header: "Proyek Saya 🚀" }, en: { header: "My Projects 🚀" } };

    return (
        <View style={[styles.container, { backgroundColor: isDark ? "#1F2937" : "#F9FAFB" }]}>
            <Text style={[styles.header, { color: isDark ? "#FBBF24" : "#1E40AF" }]}>{texts[language].header}</Text>
            <FlatList
                data={projects}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <ProjectCard
                        item={item}
                        index={index}
                        language={language}
                        isDark={isDark}
                        onPress={() =>
                            navigation.navigate("ProjectDetail", {
                                title: item.title[language],
                                description: item.description[language],
                                logo: item.logo,
                                github: item.github,
                                language,
                            })
                        }
                    />
                )}
            />
        </View>
    );
}

export function ProjectDetailScreen({
    route,
}: {
    route: RouteProp<RootStackParamList, "ProjectDetail">;
}): React.ReactElement {
    const { title, description, logo, github, language } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "ProjectDetail">>();
    const theme = useColorScheme();
    const isDark = theme === "dark";

    const texts = {
        id: { github: "🔗 Lihat di GitHub", back: "← Kembali" },
        en: { github: "🔗 View on GitHub", back: "← Back" },
    };

    return (
        <View style={[styles.detailContainer, { backgroundColor: isDark ? "#111827" : "#FFF7ED" }]}>
            <Image source={logo} style={styles.detailLogo} />
            <Text style={[styles.detailTitle, { color: isDark ? "#FBBF24" : "#D97706" }]}>{title}</Text>
            <Text style={[styles.detailDescription, { color: isDark ? "#D1D5DB" : "#374151" }]}>{description}</Text>

            <TouchableOpacity style={styles.githubButton} onPress={() => Linking.openURL(github)}>
                <Text style={styles.githubText}>{texts[language].github}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>{texts[language].back}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function ProjectsStack({ route }: { route: any }): React.ReactElement {
    const { language = "id" } = route?.params || {};
    return (
        <Stack.Navigator initialRouteName="Projects">
            <Stack.Screen name="Projects" children={() => <ProjectsScreen />} initialParams={{ language }} />
            <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    card: { flexDirection: "row", padding: 15, borderRadius: 12, marginBottom: 15, alignItems: "center" },
    logo: { width: 70, height: 70, borderRadius: 10, marginRight: 15, backgroundColor: "#ccc" },
    textContainer: { flex: 1 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
    description: { fontSize: 14 },
    detailContainer: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
    detailLogo: { width: 120, height: 120, borderRadius: 15, marginBottom: 20, backgroundColor: "#ccc" },
    detailTitle: { fontSize: 26, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    detailDescription: { fontSize: 16, textAlign: "center" },
    githubButton: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#1E3A8A", borderRadius: 8 },
    githubText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16, textAlign: "center" },
    backButton: { marginTop: 20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "#FBBF24", borderRadius: 8 },
    backText: { color: "#1F2937", fontWeight: "bold", fontSize: 16, textAlign: "center" },
});