import { useTranslation } from "react-i18next";
import HeaderWithBackandImage from "@/components/HeaderBackButtons";
import {
    ImageBackground,
    StyleSheet,
    View,
    Image,
    Dimensions
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
        </ImageBackground>
    );


}
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    topLayer: {
        flexDirection: "row",
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