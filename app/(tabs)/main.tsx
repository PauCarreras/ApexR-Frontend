import HeaderWithBackandImage from "@/components/HeaderBackButtons";
import FastAccess from "@/components/fastAccessRow";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { router } from "expo-router";
import { GetUserInfo, UserInfo } from "@/api/user";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Pressable
} from "react-native";
import PerformanceStats from "@/components/performanceRow";
import EventCarousel from "@/components/EventCarrousel";
import { useEffect, useState } from "react";

const { width } = Dimensions.get("window");
const logoSize = width * 0.6;

export default function LoginScreen() {
    const { t } = useTranslation();
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUser() {
            try {
                const currentUser = await GetUserInfo();
                setUser(currentUser);
            } catch (error) {
                if (error instanceof Error && error.message === "UNAUTHORIZED") {
                    router.replace("/login");
                    return;
                }
                console.log(error);
                setError("Could not load user info")
            } finally {
                setIsLoadingUser(false);
            }
        }
        loadUser();
    }, [])

    if (isLoadingUser) {
        return (
            <ImageBackground
                source={require("@/assets/images/background.png")}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator color="#FFFFFF" />
                </View>
            </ImageBackground>
        )
    }
    if (error) {
        return (
            <ImageBackground
                source={require("@/assets/images/background.png")}
                resizeMode="cover"
                style={styles.background}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: colors.text.red }}>{error}</Text>
                </View>
            </ImageBackground>
        );
    }
    return (
        <ImageBackground
            source={require("@/assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <HeaderWithBackandImage image={require("@/assets/images/logo.png")} />
            <View style={styles.main}>
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={{ fontFamily: fonts.title.default, color: colors.text.title, fontSize: 22, alignContent: "flex-start" }}>
                            Welcome, {user?.DisplayName ?? "user"}!
                        </Text>
                        <Text style={{ fontFamily: fonts.subtitle.default, color: colors.text.default }}>
                            Get your driving to the next level
                        </Text>
                    </View>
                    <View style={styles.right}>
                        <Image
                            source={require("@/assets/images/profilePicDefault.png")}
                            resizeMode="contain"
                            style={styles.profilePic}
                        />
                        <Text style={styles.level}>Level {user?.TotalXp ?? "0"}</Text>
                    </View>
                </View>
                <EventCarousel></EventCarousel>
                <View style={{ alignItems: "center", marginTop: 12, flexDirection: "row", gap: "3%" }}>
                    <Text style={{ color: colors.text.title, fontWeight: "700" }}>
                        Your Performance
                    </Text>
                    <Pressable onPress={() => router.back()} style={{ marginLeft: 'auto', flexDirection: "row", alignContent: "center" }}>
                        <Text style={{ color: colors.link.default }}>
                            View stats

                        </Text>
                        <Ionicons name="chevron-forward" size={18} color={colors.text.title} >

                        </Ionicons>

                    </Pressable>
                </View>
                <View>
                    <PerformanceStats />
                    <View style={styles.fastAccessSection}>
                        <Text style={styles.fastAccessTitle}>Fast Access</Text>
                        <FastAccess />
                    </View>
                </View>

            </View>
        </ImageBackground >
    );
}



const RADIUS = 8;
const styles = StyleSheet.create({
    fastAccessSection: {
        width: "100%",
        position: "relative",
        paddingTop: 8,
    },

    fastAccessTitle: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    card: {
        width: "100%",
        height: 172,
        borderWidth: 1,
        borderColor: "#6E6E6E",
        borderRadius: RADIUS,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#000",
    },

    cardImage: {
        borderRadius: RADIUS,
    },

    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.42)",
    },
    content: {
        width: "50%",
        height: "100%",
        paddingLeft: 16,
        paddingTop: 12,
        zIndex: 2,
    },

    nextText: {
        color: "#FF1A1A",
        fontSize: 14,
        marginBottom: 8,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 15,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
        gap: 8,
    },

    infoText: {
        color: "#8A8A8A",
        fontSize: 12,
        fontStyle: "italic",
    },
    profilePic: {
        width: width * 0.20,
        height: width * 0.20,
        alignItems: "flex-end",
    },
    right: {
        alignItems: "flex-end",
        paddingTop: 4,
        justifyContent: "center"

    },
    left: {
        flex: 1,
        justifyContent: "center"
    },
    background: {
        flex: 1,
    },
    main: {
        width: "95%",
        alignSelf: "center",
    },
    level: {
        color: colors.text.red,
        textAlign: "center",
        width: width * 0.25,
    },
    row: {
        paddingLeft: 20,
        paddingRight: 14,
        flexDirection: "row",
        marginBottom: "2%",
        width: "100%",
        alignItems: "center",
        overflow: "hidden",
    }
})