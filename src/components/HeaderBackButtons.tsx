import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";

type Props = {
    image: ImageSourcePropType;
};

export default function HeaderWithBackAndImage({ image }: Props) {
    const { width, height } = useWindowDimensions();

    const headerHeight = height * 0.18;
    const imageSize = Math.min(width * 0.4, headerHeight * 1);
    const buttonSize = Math.max(40, width * 0.11);
    const iconSize = Math.max(16, Math.floor(buttonSize * 0.65));

    return (
        <View style={[styles.container, { height: headerHeight }]}>
            <Pressable
                onPress={() => router.back()}
                style={[
                    styles.backButton,
                    {
                        width: buttonSize,
                        height: buttonSize,
                        borderRadius: buttonSize / 2,
                    },
                ]}
            >
                <Ionicons
                    name="chevron-back"
                    size={iconSize}
                    color="#FFFFFF"
                    accessibilityLabel="back"
                />
            </Pressable>

            <Image
                source={image}
                style={{
                    width: imageSize,
                    height: imageSize,
                }}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },

    backButton: {
        position: "absolute",
        top: "12%",
        left: "4%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
});