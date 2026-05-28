import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { login } from "@/api/auth";
import { saveToken } from "@/auth/tokenStorage";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
const { width } = Dimensions.get("window");
const logoSize = width * 0.7;

export default function LoginScreen() {
  const { t } = useTranslation();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!usernameOrEmail.trim() || !password) {
      setError(t("login.requiredFields"));
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const data = await login(usernameOrEmail.trim(), password);
      await saveToken(data.accessToken);
      router.replace("/main");
    } catch (loginError) {
      if (loginError instanceof Error && loginError.message === "INVALID_CREDENTIALS") {
        setError(t("login.invalidCredentials"));
        return;
      }

      if (loginError instanceof Error && loginError.message === "LOGIN_REQUEST_ERROR") {
        setError(t("login.requestError"));
        return;
      }

      setError(t("login.connectionError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.logoLayer}>
        <Image
          source={require("@/assets/images/logo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.form}>
          <TextInput
            placeholder={t("login.email")}
            placeholderTextColor="#8A8A8A"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={usernameOrEmail}
            onChangeText={setUsernameOrEmail}
          />
          <TextInput
            placeholder={t("login.password")}
            placeholderTextColor="#8A8A8A"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.forgotPasswordContainer}>
            <Pressable
              onPress={() => router.push("/forgotPwd")}
            >
              <Text style={styles.forgotPasswordStyle}>
                {t("login.forgotPassword")}
              </Text>
            </Pressable>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Pressable
            style={({ pressed }) => [
              styles.buttonStyle,
              (pressed || isLoading) && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>{t("login.button")}</Text>
            )}
          </Pressable>
        </View>
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>
            {t("login.noAccount")}
          </Text>
          <Pressable
            onPress={() => router.push("/register")}
          >
            <Text style={styles.signupLink}>
              {t("login.signUp")}
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  logo: {
    width: logoSize,
    height: logoSize,
  },
  logoLayer: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",

  },
  form: {
    width: "80%",
    marginTop: "15%",
    alignContent: "center",
    maxWidth: 360,
  },
  input: {
    height: 44,
    minHeight: 30,
    borderWidth: 1,
    marginTop: 12,
    borderColor: "#8A8A8A",
    color: "#8A8A8A",
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  buttonStyle: {
    height: 48,
    borderRadius: 10,
    marginTop: "12%",
    minHeight: 40,
    backgroundColor: "#ff0000a2",
    justifyContent: "center",
    alignItems: "center"

  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  errorText: {
    color: "#FF7272",
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 6,
  },
  forgotPasswordStyle: {
    color: "#8A8A8A",
    fontSize: 11,
  },
  signupRow: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: "15%"
  },
  signupText: {
    color: "#8A8A8A",
    fontSize: 13,
    textAlign: "left",
  },
  signupLink: {
    color: "#ff0000a2",
    fontSize: 13,
    textAlign: "right",
    textDecorationLine: "underline",
    textShadowColor: "transparent",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
  }
});
