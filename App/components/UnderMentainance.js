import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";

function UnderMentainance(props) {
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
    <View style={styles.container}>
      <LottieView
        autoPlay
        progress={animationProgress.current}
        source={require("../assets/Animations/astronot.json")}
      />
      <AppText style={styles.textDisplay}>
        We are working on it...check back later!
      </AppText>
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("AddIncomeExpense");
          }}
        >
          <Icon
            size={40}
            name="chevron-left"
            backgroundColor="white"
            iconColor={colors.dark}
          />
        </TouchableOpacity>
      </View>
    </View>
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
