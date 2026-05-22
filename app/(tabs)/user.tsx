import { StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
