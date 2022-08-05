import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";

function Header(props) {
  return (
    <Screen
      style={{
        maxHeight: "50%",
        flex: 0,
        padding: 0,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ height: "100%" }}>
        <View style={styles.headerTitle}>
          <AppText style={styles.titleExpense}>My Expenses</AppText>
          <AppText>Summary (private)</AppText>
        </View>
        <View style={styles.headerSecond}>
          <Icon
            name={"calendar-alt"}
            backgroundColor="transparent"
            iconColor={colors.dark}
            styles={styles.iconStyle}
            size={40}
          />
          <View style={styles.dateStyle}>
            <AppText style={styles.titleSecond}>05 August 2022</AppText>
            <AppText>18% more than the last month</AppText>
          </View>
        </View>
      </View>
      <View></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  headerSecond: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleExpense: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.dark,
    fontFamily: "NunitoMedium",
  },
  titleSecond: {
    fontSize: 17,
    color: colors.dark,
    fontFamily: "NunitoMedium",
  },
  iconStyle: {},
  dateStyle: { marginHorizontal: 15 },
});

export default Header;
