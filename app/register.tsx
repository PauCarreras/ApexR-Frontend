import HeaderWithBackandImage from "@/components/HeaderBackButtons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
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
                    <Ionicons name="person-outline" size={24} color="rgba(138, 138, 138, 0.66)" paddingRight={10} />
                    <TextInput
                        placeholder="Full name"
                        placeholderTextColor="#8A8A8A"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.dataLayer}>
                    <Ionicons name="mail-outline" size={24} color="rgba(138, 138, 138, 0.66)" paddingRight={10} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#8A8A8A"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.dataLayer}>
                    <Ionicons name="lock-closed-outline" size={24} color="rgba(138, 138, 138, 0.66)" paddingRight={10} />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#8A8A8A"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    <Ionicons name="eye-outline" size={24} color="rgba(138, 138, 138, 0.66)"  />
                </View>
                <View style={styles.dataLayer}>
                    <Ionicons name="lock-closed-outline" size={24} color="rgba(138, 138, 138, 0.66)" paddingRight={10} />
                    <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor="#8A8A8A"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    <Pressable style={styles.row}>
                        <Ionicons name="eye-outline" size={24} color="rgba(138, 138, 138, 0.66)" />
                    </Pressable>
                </View>
            </View>

        </ImageBackground >
    );


}
const styles = StyleSheet.create({
    row:{
        width: "20%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
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
        paddingLeft: 10,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "rgba(255,255,255,0.18)",
        backgroundColor: "rgba(0,0,0,0.28)",
    }
})