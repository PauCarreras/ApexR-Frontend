import HeaderWithBackandImage from "@/components/HeaderBackButtons";
import { colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
    Dimensions,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

const { width } = Dimensions.get("window");
const logoSize = width * 0.6;

export default function LoginScreen() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const passwordRules = [
        {
            label: t("register.caracters"),
            valid: password.length >= 8,
        },
        {
            label: t("register.mayus"),
            valid: /[A-Z]/.test(password),
        },
        {
            label: t("register.number"),
            valid: /\d/.test(password),
        },
    ];
    return (
        <ImageBackground
            source={require("@/assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <HeaderWithBackandImage image={require("@/assets/images/logo.png")} />
            <View style={styles.registerMain}>
                <Text style={styles.title}>
                    {t("register.createAccount")}
                </Text>
                <Text style={styles.subtitle}>
                    {t("register.joinUs")}
                </Text>
                <View style={styles.dataLayer}>
                    <Ionicons name="person-outline" size={24} color={colors.border.default} paddingRight={10} />
                    <TextInput
                        placeholder={t("register.name")}
                        placeholderTextColor={colors.text.default}
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>
                <View style={styles.dataLayer}>
                    <Ionicons name="mail-outline" size={24} color={colors.border.default} paddingRight={10} />
                    <TextInput
                        placeholder={t("register.email")}
                        placeholderTextColor={colors.text.default}
                        autoCapitalize="none"
                        style={styles.input}
                    />
                </View>
                <View style={styles.dataLayer}>
                    <Ionicons name="lock-closed-outline" size={24} color={colors.border.default} paddingRight={10} />
                    <TextInput
                        placeholder={t("register.password")}
                        placeholderTextColor={colors.text.default}
                        autoCapitalize="none"
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Pressable style={styles.row} onPress={() => setShowPassword(v => !v)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color={colors.border.default} />
                    </Pressable>
                </View>
                <View style={styles.dataLayer}>
                    <Ionicons name="lock-closed-outline" size={24} color={colors.border.default} paddingRight={10} />
                    <TextInput
                        placeholder={t("register.confirmPassword")}
                        placeholderTextColor={colors.text.default}
                        autoCapitalize="none"
                        secureTextEntry={!showConfirmPassword}
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <Pressable style={styles.row} onPress={() => setShowConfirmPassword(v => !v)}>
                        <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={24} color={colors.border.default} />
                    </Pressable>
                </View>
                <View style={{ gap: 14, marginTop: 20, }}>
                    {passwordRules.map((rule) => (
                        <View
                            key={rule.label}
                            style={{
                                flexDirection: "row",
                                alignItems: "flex-start",
                                gap: 12,
                            }}
                        >
                            <Ionicons
                                name={rule.valid ? "checkmark-circle" : "ellipse-outline"}
                                size={24}
                                color={rule.valid ? colors.information.valid : colors.information.invalid}
                            />

                            <Text
                                style={{
                                    color: rule.valid ? colors.information.valid : colors.information.invalid,
                                    fontSize: 16,
                                }}
                            >
                                {rule.label}
                            </Text>
                        </View>
                    ))}
                </View>
                <View>
                    <Text
                        style={{ color: colors.information.invalid, opacity: password !== confirmPassword ? 1 : 0 }}
                    >
                        {t("register.passwordsDontMatch")}
                    </Text>
                    <Pressable
                        style={styles.buttonStyle}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.buttonText}>{t("register.button")}</Text>
                    </Pressable>
                </View>
                <View style={{ alignItems: "center", marginTop: 20, flexDirection: "row", gap: "3%" }}>
                    <Text style={{ color: colors.text.default, }}>
                        {t("register.haveAccount")}
                    </Text>
                    <Pressable onPress={() => router.back()}>
                        <Text style={{ color: colors.link.default, textDecorationLine: "underline" }}>
                            {t("register.signIn")}
                        </Text>
                    </Pressable>
                </View>
            </View>

        </ImageBackground >
    );


}
const styles = StyleSheet.create({
    buttonStyle: {
        height: 48,
        borderRadius: 10,
        marginTop: "5%",
        minHeight: 40,
        backgroundColor: colors.button.default,
        justifyContent: "center",
        alignItems: "center"

    },
    buttonText: {
        color: colors.button.text,
        fontSize: 16,
        fontWeight: "600",
    },
    input: {
        flex: 1,
        color: colors.text.default
    },
    row: {
        width: "20%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: 10
    },
    background: {
        flex: 1,
    },
    logoLayer: {
        flex: 1,
        alignItems: "center",
        paddingTop: "10%"
    },
    logo: {
        width: logoSize,
        height: logoSize,
    },
    registerMain: {
        alignItems: "center",
    },
    title: {
        fontFamily: "Bungee_400Regular",
        fontSize: 24,
        fontWeight: 900,
        letterSpacing: 0.8,
        color: "#FFFFFF",
        textTransform: "uppercase",
        transform: [{ skewX: "-8deg" }],
    },
    subtitle: {
        fontFamily: "Inter_500Medium",
        fontSize: 15,
        color: "#8A8A8A",
        marginBottom: "3%",
    },
    dataLayer: {
        marginTop: "3%",
        paddingLeft: 10,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.border.default,
        backgroundColor: "rgba(0,0,0,0.28)",
    }
})