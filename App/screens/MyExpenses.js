import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import Header from "./Expenses/Header";
import Icon from "../components/Icon";

function MyExpenses(props) {
  return (
    <>
      <Header />
      <Screen style={{ backgroundColor: "yellow" }}>
        <View style={styles.graphContainer}>
          <AppText>Categories</AppText>
          <Icon name={"trash"} backgroundColor={"#fff"} iconColor={"red"} />
        </View>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  graphContainer: {},
});

export default MyExpenses;
