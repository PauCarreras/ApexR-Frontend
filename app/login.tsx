import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
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
            placeholderTextColor="rgba(255,255,255,0.2)"
            style={styles.input}
            keyboardType="email-address"
          >
          </TextInput>
          <TextInput
            placeholder={t("login.password")}
            placeholderTextColor="rgba(255,255,255,0.2)"
            style={styles.input}
            secureTextEntry={true}
          />
          <View style={styles.forgotPasswordContainer}>
            <Pressable>
              <Text style={styles.forgotPasswordStyle}>
                {t("login.forgotPassword")}
              </Text>
            </Pressable>
          </View>
          <Pressable 
            style={styles.buttonStyle}
            onPress={()=>router.push("/register")}
          >
            <Text style={styles.buttonText}>{t("login.button")}</Text>
          </Pressable>
        </View>
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>
            {t("login.noAccount")}
          </Text>
          <Pressable>
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
    flex:1,
    alignItems: "center",
    paddingTop: "10%",

  },
  form:{
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
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    paddingHorizontal: 16,
  },
  buttonStyle:{
    height: 48,
    borderRadius:10,
    marginTop: "12%",
    minHeight: 40,
    backgroundColor: "rgba(250, 24, 43, 0.8)",
    justifyContent: "center",
    alignItems: "center"

  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginTop: 6,
  },
  forgotPasswordStyle:{
    color:"#FFFFFF",
    fontSize: 11,
  },
  signupRow: {
    width:"80%",
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: "29%"
  },
  signupText: {
    color: "#FFFFFF",
    fontSize: 13,
    textAlign: "left",
  },
  signupLink: {
    color: "#FFFFFF",
    fontSize: 13,
    textAlign: "right",
    textDecorationLine: "underline",
    textShadowColor: "transparent",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
  }
});
