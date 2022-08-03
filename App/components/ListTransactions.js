import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import colors from "../config/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "./AppText";

function ListTransactions({
  name = "fast-food",
  size = 45,
  Linearbackground = "#ff00d4",
  Linearbackground2 = "#00ddff",
  Linearbackground3 = "#fbb040",
  iconColor = "#fff",
  title,
  notitle,
  subtitle,
  DateTransac,
}) {
  return (
    <View style={styles.containerParent}>
      <View style={styles.container}>
        <LinearGradient
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          colors={[Linearbackground, Linearbackground2, Linearbackground3]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <FontAwesome5Icon name={name} color={iconColor} size={size * 0.5} />
        </LinearGradient>
        <View style={styles.textsTitle}>
          <AppText style={styles.titleStyle}>{title}</AppText>
          <AppText style={[styles.titleStyle, { fontSize: 15 }]}>
            {notitle}
          </AppText>
        </View>
      </View>
      <View style={{ marginHorizontal: 10, alignItems: "flex-end" }}>
        <AppText style={styles.subtitleStyle}>{subtitle}</AppText>
        <AppText style={{ fontSize: 12 }}>{DateTransac}</AppText>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: "grey",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  textsTitle: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 17,
    color: colors.dark,
    fontFamily: "NunitoMedium",
  },
  subtitleStyle: {
    color: colors.black,
  },
});

export default ListTransactions;
