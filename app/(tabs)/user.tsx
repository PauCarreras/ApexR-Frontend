import { removeToken } from "@/auth/tokenStorage";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
    const handleLogout = async () => {
        await removeToken();
        router.replace("/login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User</Text>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
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
    logoutButton: {
        height: 44,
        minWidth: 140,
        borderRadius: 10,
        marginTop: 24,
        backgroundColor: "#ff0000a2",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
    },
    logoutText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
