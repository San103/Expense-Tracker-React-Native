import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import IconCat from "../IconCategories";
import AppText from "../AppText";

function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <IconCat
          styles={{ shadowColor: item.backgroundColor, elevation: 10 }}
          name={item.icon}
          backgroundColor={item.backgroundColor}
          backgroundColor1={item.backgroundColor1}
          backgroundColor2={item.backgroundColor2}
        />
      </TouchableOpacity>
      <AppText style={styles.textLabel}>{item.label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "35%",
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  iconStyle: {},
  textLabel: {
    fontFamily: "Roboto",
    textAlign: "center",
    marginTop: 8,
  },
});

export default CategoryPickerItem;
