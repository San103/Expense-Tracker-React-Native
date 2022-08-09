import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";
import LottieView from "lottie-react-native";

import AppText from "./AppText";

function SuccessIndicator(props) {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) return props.navigation.push("HomeNav");
    });
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        loop={false}
        progress={animationProgress.current}
        source={require("../assets/Animations/SuccessAnim.json")}
      />
      <AppText style={styles.Text}>Yay! Added Successfully</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  Text: {
    fontSize: 25,
    color: "#14F649",
    fontFamily: "NunitoMedium",
    alignSelf: "center",
    marginTop: 250,
  },
});

export default SuccessIndicator;
