import { useTranslation } from "react-i18next";
import {
    ImageBackground,
    StyleSheet
} from "react-native";



export default function LoginScreen() {
    const { t } = useTranslation();
    return(
        <ImageBackground
            source={require("@/assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >

        </ImageBackground>
    );


}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
})