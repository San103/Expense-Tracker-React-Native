import React from "react";
import { View, StyleSheet } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

function icon({
  name,
  styles,
  size = 80,
  backgroundColor = "red",
  bRadius = 4,
  iconColor = "#fff",
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / bRadius,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "gray",
          borderWidth: 2,
        },
        styles,
      ]}
    >
      <FontAwesome5Icon name={name} color={iconColor} size={size * 0.4} />
    </View>
  );
}

export default icon;
