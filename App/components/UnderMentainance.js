import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import AppText from "./AppText";
import Screen from "./Screen";
import Icon from "./Icon";
import colors from "../config/colors";

function UnderMentainance({
  title = "expense category for next Month Prediction",
}) {
  const { height, width } = useWindowDimensions();
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);
  return (
    <Screen>
      <AppText
        style={{
          fontFamily: "NunitoBold",
          fontSize: 25,
          textAlign: "center",
          marginVertical: 28,
        }}
      >
        Please add more {title}
      </AppText>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          autoPlay
          progress={animationProgress.current}
          source={require("../assets/Animations/astronot.json")}
          style={{
            marginTop: 0,
            width: width - 400,
            height: height - 400,
          }}
          resizeMode="cover"
        />
        <AppText style={{ textAlign: "center" }}>
          404: Oooh noo... there's nothing here! Just like your partner ghosted
          you.{" "}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textDisplay: {
    textAlign: "center",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 400,
  },
});

export default UnderMentainance;
