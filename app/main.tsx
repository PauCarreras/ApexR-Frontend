import { useTranslation } from "react-i18next";
import { fonts } from "@/constants/fonts";
import { colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import HeaderWithBackandImage from "@/components/HeaderBackButtons";
import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    Pressable
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
            <View style={styles.resetMain}>
                <Text style={styles.title}>
                    {t("forgotPassword.title")}
                </Text>
                <Text style={styles.subtitle}>
                    {t("forgotPassword.instructions")}
                </Text>
                <View style={styles.dataLayer}>
                    <Ionicons name="mail-outline" size={24} color={colors.border.default} paddingRight={10} />
                    <TextInput
                        placeholder={t("forgotPassword.mail")}
                        placeholderTextColor={colors.text.default}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.newone}>
                    <Pressable
                        style={styles.buttonStyle}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.buttonText}>{t("forgotPassword.button")}</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground >
    );


}
const styles = StyleSheet.create({
    newone: {
        width: "80%",
    },
    buttonStyle: {
        height: 48,
        borderRadius: 10,
        marginTop: "5%",
        minHeight: 40,
        backgroundColor: colors.button.default,
        justifyContent: "center",
        alignItems: "center"

    },
    buttonText: {
        color: colors.button.text,
        fontSize: 16,
        fontWeight: "600",
    },
    dataLayer: {
        marginTop: "3%",
        paddingLeft: 10,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.border.default,
        backgroundColor: "rgba(0,0,0,0.28)",
    },
    input: {
        height: 44,
        minHeight: 30,
        width: "80%",
        borderWidth: 1,
        marginTop: 12,
        borderColor: colors.border.default,
        borderRadius: 15,
        color: colors.text.default,
        paddingHorizontal: 16,
    },
    resetMain: {
        alignItems: "center",
        fontStyle: "italic",
    },
    title: {
        fontFamily: fonts.title.default,
        fontSize: 24,
        fontWeight: 900,
        letterSpacing: 0.8,
        textAlign: "center",
        marginBottom: "3%",
        color: "#FFFFFF",
        textTransform: "uppercase",
        transform: [{ skewX: "-8deg" }],
    },
    subtitle: {
        fontFamily: fonts.subtitle.default,
        fontSize: 15,
        color: "#8A8A8A",
        textAlign: "center",
        width: "60%",
        marginBottom: "3%",
    },
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
})