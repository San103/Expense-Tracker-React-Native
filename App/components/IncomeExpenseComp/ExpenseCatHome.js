import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const size = 60;
function ExpenseCatHome({ bg1, bg2, bg3, icon, label }) {
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => console.log("Hello")}
    >
      <LinearGradient
        style={styles.LGStyle}
        colors={[bg1, bg2, bg3]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 0.8, y: 1.2 }}
      >
        {icon && (
          <FontAwesome5Icon
            name={icon}
            size={size * 0.4}
            color="#fff"
            style={styles.icon}
          />
        )}
      </LinearGradient>
      <AppText style={[styles.textCategory]}>{label}</AppText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 100,
    marginHorizontal: 10,
    width: size,
  },
  LGStyle: {
    height: size,
    width: size,
    flexDirection: "row",
    borderRadius: size / 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#b3aba2",
    elevation: 5,
  },
  textCategory: {
    color: "#9E9E9E",
    textAlignVertical: "center",
    alignSelf: "center",
    height: 35,
    fontSize: 12,
  },
  icon: {
    justifyContent: "center",
  },
});

export default ExpenseCatHome;
