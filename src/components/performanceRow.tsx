import { UserStats } from "@/api/user";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type StatItem = {
    id: string;
    label: string;
    value: string;
    detail: string;
    icon: keyof typeof Ionicons.glyphMap;
};

type PerformanceStatsProps = {
    stats: UserStats | null;
};

function formatDistance(totalDistanceDriven?: number) {
    if (totalDistanceDriven == null) {
        return "-";
    }

    return `${totalDistanceDriven.toFixed(1)} km`;
}

function formatSpeed(avgSpeed?: number) {
    if (avgSpeed == null) {
        return "-";
    }

    return `${avgSpeed.toFixed(1)} km/h`;
}

export default function PerformanceStats({ stats }: PerformanceStatsProps) {
    const displayedStats: StatItem[] = [
        {
            id: "distance",
            label: "TOTAL KM",
            value: formatDistance(stats?.totalDistanceDriven),
            detail: "",
            icon: "speedometer-outline",
        },
        {
            id: "segments",
            label: "SEGMENTS",
            value: String(stats?.segmentsCompleted ?? "-"),
            detail: "",
            icon: "map-outline",
        },
        {
            id: "events",
            label: "EVENTS",
            value: String(stats?.eventsParticipated ?? "-"),
            detail: "",
            icon: "trophy-outline",
        }
    ];

    return (
        <View style={styles.section}>
            <View style={styles.cards}>
                {displayedStats.map((item) => (
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
