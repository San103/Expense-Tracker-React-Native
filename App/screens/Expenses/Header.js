import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import Screen from "../../components/Screen";
import moment from "moment";

function Header(props) {
  const dateCurrent = moment().endOf("day").format("DD MMMM YYYY");

  return (
    <Screen
      style={{
        padding: 0,
        maxHeight: 190,
        backgroundColor: "#fff",
      }}
    >
      <View style={{}}>
        <View style={styles.headerTitle}>
          <AppText style={styles.titleExpense}>Expenses & Income</AppText>
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
            <AppText style={styles.titleSecond}>{dateCurrent}</AppText>
            <AppText>Current Month Summary</AppText>
          </View>
        </View>
      </View>
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
