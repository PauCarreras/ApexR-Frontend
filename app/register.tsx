import { useTranslation } from "react-i18next";
import HeaderWithBackandImage from "@/components/HeaderBackButtons";
import { useFonts, Bungee_400Regular } from "@expo-google-fonts/bungee";
import { Inter_500Medium } from "@expo-google-fonts/inter";

import {
    ImageBackground,
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TextInput,
} from "react-native";

const { width } = Dimensions.get("window");
const logoSize = width * 0.6;

export default function LoginScreen() {
    const { t } = useTranslation();
    return (
        <ImageBackground
            source={require("@/assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <HeaderWithBackandImage image={require("@/assets/images/logo.png")} />
            <View style={styles.registerMain}>
                <Text style={styles.title}>
                    {t("register.createAccount")}
                </Text>
                <Text style={styles.subtitle}>
                    {t("register.joinUs")}
                </Text>
                <View style={styles.dataLayer}>
                    <TextInput
                        placeholder="Full name"
                        placeholderTextColor="#8A8A8A"
                        autoCapitalize="none"
                    />
                </View>
            </View>

        </ImageBackground >
    );


}
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    logoLayer: {
        flex: 1,
        alignItems: "center",
        paddingTop: "10%"
    },
    logo: {
        width: logoSize,
        height: logoSize,
    },
    registerMain: {
        alignItems: "center",
    },
    title: {
        fontFamily: "Bungee_400Regular",
        fontSize: 24,
        fontWeight: 900,
        letterSpacing: 0.8,
        color: "#FFFFFF",
        textTransform: "uppercase",
        transform: [{ skewX: "-8deg" }],
    },
    subtitle: {
        fontFamily: "Inter_500Medium",
        fontSize: 15,
        color: "#8A8A8A",
        marginBottom: "3%",
    },
    dataLayer: {
        marginTop: "3%",
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "rgba(255,255,255,0.18)",
        backgroundColor: "rgba(0,0,0,0.28)",
    }
})