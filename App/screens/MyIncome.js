import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppText from "../components/AppText";
import Icon from "../components/Icon";
import colors from "../config/colors";
import { VictoryPie } from "victory-native";
import { DatabaseConnection } from "../components/Database/dbConnection";
import MyExpenses from "./MyExpenses";
const db = DatabaseConnection.getConnection();

function MyIncome(props) {
  return renderIncomeSummary2();
}
const styles = StyleSheet.create({
  graphContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textCat: {
    color: colors.dark,
    fontFamily: "NunitoMedium",
    fontSize: 25,
  },
});

export default MyIncome;
