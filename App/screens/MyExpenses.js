import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import Header from "./Expenses/Header";
import Icon from "../components/Icon";
import colors from "../config/colors";
import { VictoryPie } from "victory-native";
import { DatabaseConnection } from "../components/Database/dbConnection";
const db = DatabaseConnection.getConnection();
function MyExpenses(props) {
  const [getDate, setDate] = useState();
  const [category, setCategory] = useState([]);
  //Current Date to Display Default
  const dateNow = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const sanDate = dateNow + "/" + (month + 1) + "/" + year;
  useEffect(() => {
    getDateNow();
  }, []);

  const getDateNow = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT category FROM table_income where date <= ? and date >= ?",
        [sanDate, sanDate],

        (tx, results) => {
          const temp = [];
          var temp2 = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i).category);
            setCategory(temp);
            tx.executeSql(
              "SELECT SUM(amountBalance) as tot FROM table_income where category= ? and date <= ? and date >= ?",
              [temp[i], sanDate, sanDate],
              (tx2, results2) => {
                for (let j = 0; j < results2.rows.length; ++j) {
                  for (let a = 0; a < results2.rows.length; ++a) {
                    temp2[j][a] = temp[j];
                    if (temp2[j][a] != temp[j]) {
                      console.log(results2.rows.item(j).tot);
                    }
                  }
                }
              }
            );
          }
        }
      );
    });
  };
  console.log(category);
  const categoryToDisplay = () => {};

  const renderChart = () => {
    let chartData = categoryToDisplay();
    return (
      <View>
        <VictoryPie data={chartData} />
      </View>
    );
  };
  return (
    <>
      <Header />
      <Screen>
        <View style={styles.graphContainer}>
          <AppText style={styles.textCat}>Categories</AppText>
          <Icon
            name={"list-ul"}
            backgroundColor={"#fff"}
            iconColor={colors.dark}
            size={40}
          />
        </View>
        <View>{renderChart()}</View>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  graphContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textCat: {
    fontSize: 20,
  },
});

export default MyExpenses;
