import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { colors } from "@/constants/colors";
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from "react-native";
import type {
    ImageSourcePropType,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

type UserEvent = {
    id: string;
    name: string;
    location: string;
    date: string;
    time: string;
    image: ImageSourcePropType;
};

const TEST_EVENTS: UserEvent[] = [
    {
        id: "1",
        name: "Event 1",
        location: "Lidl parking",
        date: "20 Junio 2027",
        time: "20:20",
        image: require("@/assets/images/eventsBackground/eventBackground2.png"),
    },
    {
        id: "2",
        name: "Event 2",
        location: "Circuit Barcelona",
        date: "22 Junio 2027",
        time: "18:30",
        image: require("@/assets/images/eventsBackground/eventBackground3.png"),
    },
    {
        id: "3",
        name: "Event 3",
        location: "Parking Norte",
        date: "25 Junio 2027",
        time: "21:00",
        image: require("@/assets/images/eventsBackground/eventBackground4.png"),
    },
];

const MAX_EVENTS = 3;
const RADIUS = 8;

export default function EventCarousel() {
    const [cardWidth, setCardWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const events = TEST_EVENTS.slice(0, MAX_EVENTS);
    const hasEvents = events.length > 0;

    function handleLayout(event: LayoutChangeEvent) {
        setCardWidth(event.nativeEvent.layout.width);
    }

    function handleScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
        if (cardWidth === 0) return;

        const offsetX = event.nativeEvent.contentOffset.x;
        const nextIndex = Math.round(offsetX / cardWidth);

        setActiveIndex(nextIndex);
    }

    return (
        <View style={styles.card} onLayout={handleLayout}>
            {!hasEvents && <EmptyEventState />}

            {hasEvents && cardWidth > 0 && (
                <>
                    <FlatList
                        data={events}
                        horizontal
                        pagingEnabled
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScrollEnd}
                        renderItem={({ item }) => (
                            <EventSlide event={item} width={cardWidth} />
                        )}
                        getItemLayout={(_, index) => ({
                            length: cardWidth,
                            offset: cardWidth * index,
                            index,
                        })}
                    />

                    <View style={styles.dots}>
                        {events.map((event, index) => (
                            <View
                                key={event.id}
                                style={[
                                    styles.dot,
                                    index === activeIndex && styles.dotActive,
                                ]}
                            />
                        ))}
                    </View>
                </>
            )}
        </View>
    );
}

function EventSlide({
    event,
    width,
}: {
    event: UserEvent;
    width: number;
}) {
    return (
        <ImageBackground
            source={event.image}
            resizeMode="cover"
            style={[styles.slide, { width }]}
            imageStyle={styles.slideImage}
        >
            <View style={styles.darkOverlay} />
            <View style={styles.leftDarkGradient} />

            <View style={styles.content}>
                <Text style={styles.nextText}>Next grup event</Text>
                <Text style={styles.title}>{event.name}</Text>

                <InfoRow icon="location-outline" text={event.location} />
                <InfoRow icon="calendar-outline" text={event.date} />
                <InfoRow icon="time-outline" text={event.time} />
            </View>

        </ImageBackground>
    );
}

function InfoRow({
    icon,
    text,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
}) {
    return (
        <View style={styles.infoRow}>
            <Ionicons name={icon} size={15} color="#777" />
            <Text style={styles.infoText}>{text}</Text>
        </View>
    );
}

function EmptyEventState() {
    return (
        <ImageBackground
            source={require("@/assets/images/eventsBackground/eventBackground1.png")}
            resizeMode="cover"
            style={styles.emptyBackground}
            imageStyle={styles.slideImage}
        >
            <View style={styles.emptyOverlay} />

            <View style={styles.emptyContent}>
                <Text style={styles.emptySmall}>No upcoming events</Text>
                <Text style={styles.emptyTitle}>Create or join an event</Text>
                <Text style={styles.emptyText}>
                    You are not registered in any event yet.
                </Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    emptyBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },

    emptyOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.58)",
    },

    emptyContent: {
        paddingHorizontal: 18,
        zIndex: 2,
    },

    emptySmall: {
        color: colors.text.red,
        fontSize: 14,
        marginBottom: 8,
    },

    emptyTitle: {
        color: colors.text.title,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
    },

    emptyText: {
        color: colors.text.dark,
        fontSize: 13,
    },
    card: {
        width: "100%",
        height: 172,
        borderWidth: 1,
        borderColor: colors.border.default,
        borderRadius: RADIUS,
        overflow: "hidden",
        backgroundColor: "#000",
    },

    slide: {
        height: "100%",
        position: "relative",
    },

    slideImage: {
        borderRadius: RADIUS,
    },

    darkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.18)",
    },

    leftDarkGradient: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "48%",
        backgroundColor: "rgba(0,0,0,0.78)",
    },

    content: {
        width: "38%",
        height: "100%",
        paddingLeft: 16,
        paddingTop: 12,
        zIndex: 2,
    },

    nextText: {
        color: colors.text.red,
        fontSize: 14,
        marginBottom: 8,
    },

    title: {
        color: colors.text.title,
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 22,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
    },

    infoText: {
        color: colors.text.dark,
        fontSize: 12,
        fontStyle: "italic",
        marginLeft: 8,
    },
    dots: {
        position: "absolute",
        bottom: 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        zIndex: 5,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#681818",
        marginHorizontal: 5,
    },

    dotActive: {
        backgroundColor: "#FF2222",
        width: 8,
        height: 8,
        borderRadius: 999,
    },

    emptyState: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 18,
        backgroundColor: "#050505",
    },
});