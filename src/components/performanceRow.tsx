import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type StatItem = {
    id: string;
    label: string;
    value: string;
    detail: string;
    icon: keyof typeof Ionicons.glyphMap;
};

const MOCK_STATS: StatItem[] = [
    {
        id: "segments",
        label: "SEGMENTS",
        value: "12",
        detail: "+3 this month ↑",
        icon: "map-outline",
    },
    {
        id: "km",
        label: "TOTAL KM",
        value: "235.4 km",
        detail: "+32.1 km ↑",
        icon: "speedometer-outline",
    },
    {
        id: "events",
        label: "EVENTS",
        value: "4",
        detail: "2 upcoming ↑",
        icon: "trophy-outline",
    },
];

export default function PerformanceStats() {
    return (
        <View style={styles.section}>

            <View style={styles.cards}>
                {MOCK_STATS.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Ionicons name={item.icon} size={24} color="#C40000" />

                        <Text style={styles.label}>{item.label}</Text>

                        <Text style={styles.value}>
                            {item.value}
                        </Text>

                        <Text style={styles.detail}>
                            {item.detail}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        width: "100%",
        backgroundColor: "#000",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    statsLink: {
        marginLeft: "auto",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },

    statsLinkText: {
        color: "#FF1A1A",
        fontSize: 12,
    },

    cards: {
        flexDirection: "row",
        gap: 6,
    },

    card: {
        flex: 1,
        height: 110,
        borderWidth: 1,
        borderColor: "#6E6E6E",
        borderRadius: 5,
        backgroundColor: "#020202",
        alignItems: "center",
        paddingTop: 12,
    },

    label: {
        color: "#777777",
        fontSize: 10,
        marginTop: 4,
        letterSpacing: 1,
    },

    value: {
        color: "#FFFFFF",
        fontSize: 20,
        marginTop: 6,
        fontWeight: "400",
    },

    detail: {
        color: "#00D060",
        fontSize: 12,
        marginTop: 4,
    },
});