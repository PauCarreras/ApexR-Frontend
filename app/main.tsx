import HeaderWithBackandImage from "@/components/HeaderBackButtons";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Component } from "react";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
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
            <View style={styles.main}>
                <View style={styles.row}>
                    <View style={styles.left}>
                        <Text style={{ fontFamily: fonts.title.default, color: colors.text.title, fontSize: 22, alignContent: "flex-start" }}>
                            Welcome, User!
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
                        <Text style={styles.level}>Level 100</Text>
                    </View>
                </View>
                <ImageBackground source={require("@/assets/images/eventBackground1.png")} resizeMode="cover" style={styles.eventViewer}>
                    <View >

                        <Text style={{ color: colors.text.dark }}>
                            No events yet, start one!
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        </ImageBackground >
    );
}
const styles = StyleSheet.create({
    eventViewer: {
        marginTop: 10,
        borderColor: colors.border.dark,
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 12,
        width: "90%",
        height: "35%",
        paddingLeft: "3%"
    },
    profilePic: {
        width: width * 0.25,
        height: width * 0.25,
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
        width: "100%",
        alignItems: "center",
        overflow: "hidden",
    }
})