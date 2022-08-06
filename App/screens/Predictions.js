import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { DatabaseConnection } from "../components/Database/dbConnection";
import Button from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const db = DatabaseConnection.getConnection();

function Predictions(props) {
  const navigation = useNavigation();
  const [getCategory, setCategory] = useState([]);
  const [getCount, setCount] = useState([]);
  useEffect(() => {
    getNecessaryExpense();
  }, []);
  const getNecessaryExpense = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT category,COUNT(category) as count,SUM(amountBalance) FROM table_income where type=? GROUP BY category ORDER BY count DESC LIMIT 4",
        ["expense"],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setCount(temp);
        }
      );
    });
  };
  const getUnesseraryExpense = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT category,COUNT(category) as count,SUM(amountBalance) FROM table_income where type=? GROUP BY category ORDER BY count ASC LIMIT 4",
        ["expense"],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setCount(temp);
        }
      );
    });
  };
  console.log(getCount);
  //   console.log(getCategory);
  return (
    <Screen>
      <AppText>Hello World</AppText>
      <Button
        style={{
          height: 45,
          marginVertical: 30,
          justifyContent: "center",
          borderRadius: 50,
          backgroundColor: "dodgerblue",
        }}
        icon="check"
        mode="contained"
        onPress={navigation.navigate("AllUsers")}
      >
        Login
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Predictions;
