import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, ImageSourcePropType } from "react-native";
import { colors } from "@/constants/colors";
type FastAccessItem = {
    id: string;
    label: string;
    icon: ImageSourcePropType;
};

const Current_access: FastAccessItem[] = [
    {
        id: "events",
        label: "Events",
        icon: require("@/assets/images/icons/eventsIcon.png"),
    },
    {
        id: "segments",
        label: "Segments",
        icon: require("@/assets/images/icons/segmentsIcon.png"),
    },
    {
        id: "garage",
        label: "Garage",
        icon: require("@/assets/images/icons/garageIcon.png"),
    },
    {
        id: "clasification",
        label: "Clasification",
        icon: require("@/assets/images/icons/classificationIcon.png"),
    }

];

export default function FastAccess() {
    return (
        <View style={styles.fastAccess}>

            <View style={styles.cards}>
                {Current_access.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.label}>{item.label}</Text>
                    </View>
                ))}
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    icon: {
        width: "60%",
        height: "60%",
        resizeMode: "contain"
    },
    label: {
        marginTop: 4,
        color: colors.text.title,
        fontSize: 10,
    },
    fastAccess: {
        width: "100%",

    },
    cards: {
        flexDirection: "row",
        gap: 6,
    },
    card: {
        flex: 1,
        height: 80,
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: 5,
        alignItems: "center",
        paddingTop: 12,
    }
})