import React from "react";
import { View, StyleSheet } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";

function icon({
  name,
  styles,
  size = 80,
  backgroundColor = "red",
  backgroundColor1 = "yellow",
  backgroundColor2 = "green",
  iconColor = "#fff",
}) {
  return (
    <LinearGradient
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 4,
          justifyContent: "center",
          alignItems: "center",
        },
        styles,
      ]}
      colors={[backgroundColor, backgroundColor1, backgroundColor2]}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 0.8, y: 1.2 }}
    >
      <FontAwesome5Icon name={name} color={iconColor} size={size * 0.4} />
    </LinearGradient>
  );
}

export default icon;
