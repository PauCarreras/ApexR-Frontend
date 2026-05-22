import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { Image, StyleSheet, View } from "react-native";

export default function TabsLayout() {
    return (
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
});
