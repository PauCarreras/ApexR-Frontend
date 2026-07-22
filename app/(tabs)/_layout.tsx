import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { useState } from "react";
import { Alert, FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { GetUserInfo, UserInfo } from "@/api/user";
import { StatusBar } from "expo-status-bar";
type UserInfoResponse = UserInfo & {
    level?: unknown;
    Level?: unknown;
};

function isDeveloper(user: UserInfoResponse) {
    const level = user.Level ?? user.level;

    if (typeof level === "string") {
        return level.toLowerCase() === "developer";
    }

    return level === 2;
}

export default function TabsLayout() {
    type UserCar = {
        id: string;
        name: string;
    };

    const cars: UserCar[] = [
        { id: "1", name: "BMW M3" },
        { id: "2", name: "Audi RS6" },
        { id: "3", name: "Terranator 4x4" },
        { id: "4", name: "Terranator 4x4" },
        { id: "5", name: "Terranator 4x4" },
        { id: "6", name: "Terranator 4x4" },
        { id: "7", name: "Terranator 4x4" },
        { id: "8", name: "Terranator 4x4" },
        { id: "9", name: "Terranator 4x4" },
        { id: "10", name: "Terranator 4x4" },
        { id: "11", name: "Terranator 4x4" },
        { id: "12", name: "Terranator 4x4" },

    ];
    const [isCarPickerVisible, setIsCarPickerVisible] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState<string | null>(cars[0]?.id ?? null);

    const [isRunModeVisible, setIsRunModeVisible] = useState(false);
    const [isCarSelectorVisible, setIsCarSelectorVisible] = useState(false);

    function closeRunMode() {
        setIsRunModeVisible(false);
    }
    function closeCarSelectMode() {
        setIsCarSelectorVisible(false);
    }
    function openCarSelector() {
        closeRunMode();
        setIsCarSelectorVisible(true);
    }
    function startNormalRun() {
        closeCarSelectMode();
        closeRunMode();
        router.push("/(tabs)/clasification");
    }

    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,

                    tabBarShowLabel: true,
                    tabBarActiveTintColor: colors.text.red,
                    tabBarInactiveTintColor: colors.text.default,

                    tabBarStyle: {
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 82,
                        backgroundColor: "transparent",
                        borderTopWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                        paddingTop: 10,
                        paddingBottom: 10,
                    },

                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginTop: 2,
                    },
                    tabBarItemStyle: {
                        flex: 1,
                        height: 72,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            >
                <Tabs.Screen
                    name="main"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={30} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="calendar"
                    options={{
                        title: "Calendar",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="calendar-outline" size={30} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="clasification"
                    options={{
                        title: "Run",
                        tabBarIcon: () => (
                            <View style={styles.runButton}>
                                <Image
                                    source={require("@/assets/images/icons/eventsIcon.png")}
                                    style={styles.runIcon}
                                    resizeMode="contain"
                                />
                            </View>
                        ),
                        tabBarLabelStyle: {
                            fontSize: 12,
                            marginTop: 10,
                            color: colors.text.default,
                        },
                    }}
                    listeners={{
                        tabPress: async (event) => {
                            event.preventDefault();

                            try {
                                const user = await GetUserInfo();

                                if (isDeveloper(user)) {
                                    setIsRunModeVisible(true);
                                    return;
                                }
                                setIsCarSelectorVisible(true);
                                //router.push("/(tabs)/clasification");
                            } catch (error) {
                                if (error instanceof Error && error.message === "UNAUTHORIZED") {
                                    router.replace("/login");
                                    return;
                                }

                                Alert.alert("Error", "Could not check your user level.");
                            }
                        },
                    }}
                />

                <Tabs.Screen
                    name="garage"
                    options={{
                        title: "My Garage",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="car-sport-outline" size={30} color={color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="user"
                    options={{
                        title: "User",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="person-outline" size={30} color={color} />
                        ),
                    }}
                />
            </Tabs>

            <Modal
                animationType="fade"
                transparent
                visible={isCarSelectorVisible}
                onRequestClose={closeCarSelectMode}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalBadge}>
                            <Image
                                source={require("@/assets/images/icons/eventsIcon.png")}
                                style={styles.runIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.modalTitle}>Select your car</Text>
                        <Text style={styles.modalSubtitle}>Choose the car for the run </Text>
                        <FlatList
                            data={cars}
                            keyExtractor={(car) => car.id}
                            style={styles.carList}
                            contentContainerStyle={styles.carListContent}
                            renderItem={({ item: car }) => {
                                const isSelected = car.id === selectedCarId;

                                return (
                                    <Pressable
                                        style={styles.carOption}
                                        onPress={() => setSelectedCarId(car.id)}
                                    >
                                        <Text style={styles.carName}>{car.name}</Text>
                                        <View style={styles.radioOuter}>
                                            {isSelected && <View style={styles.radioInner} />}
                                        </View>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                    <Pressable
                        style={styles.acceptButton}
                        onPress={() => {
                            if (!selectedCarId) return;
                            setIsCarSelectorVisible(false);
                            router.push("/(tabs)/clasification");
                        }}
                    >
                        <Text style={styles.acceptText}> Accept </Text>
                    </Pressable>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent
                visible={isRunModeVisible}
                onRequestClose={closeRunMode}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalBadge}>
                            <Image
                                source={require("@/assets/images/icons/eventsIcon.png")}
                                style={styles.runIcon}
                                resizeMode="contain"
                            />
                        </View>

                        <Pressable
                            accessibilityLabel="Close run mode"
                            onPress={closeRunMode}
                            style={styles.closeButton}
                        >
                            <Ionicons name="close" size={24} color={colors.text.default} />
                        </Pressable>

                        <Text style={styles.modalTitle}>SELECT RUN MODE</Text>
                        <Text style={styles.modalSubtitle}>Choose how you want to start your run.</Text>

                        <View style={styles.modeRow}>
                            <Pressable style={[styles.modeCard, styles.recordCard]}>
                                <View style={styles.modeIconWrap}>
                                    <Ionicons name="location-outline" size={34} color={colors.text.red} />
                                    <Ionicons name="trail-sign-outline" size={30} color={colors.text.red} />
                                </View>
                                <Text style={styles.modeTitle}>RECORD NEW SEGMENT</Text>
                                <Text style={styles.modeDescription}>
                                    Record a new rally stage and add it to the database.
                                </Text>
                            </Pressable>

                            <Pressable style={styles.modeCard} onPress={openCarSelector}>
                                <View style={styles.speedIcon}>
                                    <Ionicons name="speedometer-outline" size={42} color="#FFFFFF" />
                                </View>
                                <Text style={styles.modeTitle}>NORMAL RUN</Text>
                                <Text style={styles.modeDescription}>
                                    Run as usual on existing stages and record your time.
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.noticeRow}>
                            <Ionicons name="shield-checkmark-outline" size={22} color={colors.text.default} />
                            <Text style={styles.noticeText}>
                                Only administrators can record new segments.{"\n"}
                                Thank you for helping grow the rally community!
                            </Text>
                        </View>

                        <Pressable style={styles.cancelButton} onPress={closeRunMode}>
                            <Text style={styles.cancelText}>CANCEL</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    runButton: {
        width: 45,
        height: 45,
        borderRadius: 35,
        backgroundColor: colors.button.default,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -6,
    },

    runIcon: {
        width: 30,
        height: 30,
    },
    carModalCard: {
        width: "90%",
        maxWidth: 340,
        borderRadius: 8,
        padding: 16,
        backgroundColor: "#111214",
        borderWidth: 1,
        borderColor: "#2A2A2A",
    },

    carModalTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },

    carModalSubtitle: {
        marginTop: 8,
        color: "#8A8A8A",
        fontSize: 12,
        textAlign: "center",
    },

    carList: {
        width: "100%",
        maxHeight: 260,
        marginTop: 10,
    },

    carListContent: {
        paddingBottom: 2,
    },

    carOption: {
        height: 56,
        marginBottom: 10,
        paddingHorizontal: 14,
        borderRadius: 7,
        backgroundColor: "#27282e",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    carName: {
        color: "#FFFFFF",
        fontSize: 14,
    },

    radioOuter: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: colors.button.default,
        alignItems: "center",
        justifyContent: "center",
    },

    radioInner: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: colors.button.default,
    },

    acceptButton: {
        width: "80%",
        height: 44,
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: colors.button.default,
        alignItems: "center",
        justifyContent: "center",
    },

    acceptText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
    modalBackdrop: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalCard: {
        width: "100%",
        maxWidth: 340,
        borderWidth: 1,
        borderColor: colors.text.red,
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingTop: 34,
        paddingBottom: 8,
        backgroundColor: "#111214",
    },
    modalBadge: {
        position: "absolute",
        top: -15,
        alignSelf: "center",
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.text.red,
        backgroundColor: "#B30000",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    modalTitle: {
        color: colors.text.title,
        fontSize: 19,
        fontWeight: "800",
        textAlign: "center",
    },
    modalSubtitle: {
        marginTop: 8,
        color: colors.text.default,
        fontSize: 11,
        textAlign: "center",
    },
    modeRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 22,
    },
    modeCard: {
        flex: 1,
        minHeight: 154,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border.dark,
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: "#151619",
    },
    recordCard: {
        borderColor: colors.text.red,
        shadowColor: colors.border.default,
        shadowOpacity: 0.45,
        shadowRadius: 8,
        elevation: 4,
    },
    modeIconWrap: {
        minHeight: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    speedIcon: {
        minHeight: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    modeTitle: {
        marginTop: 12,
        color: colors.text.title,
        fontSize: 10,
        fontWeight: "800",
        textAlign: "center",
    },
    modeDescription: {
        marginTop: 10,
        color: colors.text.default,
        fontSize: 9,
        lineHeight: 13,
        textAlign: "center",
    },
    noticeRow: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border.dark,
    },
    noticeText: {
        flex: 1,
        color: colors.text.default,
        fontSize: 9,
        lineHeight: 13,
    },
    cancelButton: {
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        borderWidth: 1,
        borderColor: colors.border.dark,
        borderRadius: 5,
    },
    cancelText: {
        color: colors.text.title,
        fontSize: 11,
        fontWeight: "800",
    },
});
