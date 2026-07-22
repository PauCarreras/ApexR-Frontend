import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function RunScreen() {
    return (
        <ImageBackground
            source={require("@/assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >

        </ImageBackground >
    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
    },
});
