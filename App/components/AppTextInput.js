import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

function AppTextInput({
  icon,
  bg1 = "#ff00d4",
  bg2 = "#00ddff",
  bg3 = "#fbb040",
  iconColor = "#fff",
  style,
  ...otherProps
}) {
  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        style={styles.LGStyle}
        colors={[bg1, bg2, bg3]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}
      >
        {icon && (
          <FontAwesome5Icon
            name={icon}
            size={15}
            color={iconColor}
            style={styles.icon}
          />
        )}
      </LinearGradient>
      <TextInput
        placeholderTextColor={colors.darkPrimary}
        style={styles.textInput}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    shadowColor: "#b3aba2",
    elevation: 5,
  },
  LGStyle: {
    flexDirection: "row",
    height: 35,
    width: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textInput: {
    width: "100%",
    height: 35,
    fontSize: 18,
  },
  icon: {
    marginHorizontal: 10,
    alignSelf: "center",
  },
});

export default AppTextInput;
