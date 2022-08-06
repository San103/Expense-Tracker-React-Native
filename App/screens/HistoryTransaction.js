import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import moment from "moment";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Moment from "react-moment";
import { DatabaseConnection } from "../components/Database/dbConnection";

const db = DatabaseConnection.getConnection();
function HistoryTransaction(props) {
  const [getHistory, setHistory] = useState([]);

  useEffect(() => {
    getNecessaryExpense();
  }, []);

  //Current Date to Display Default
  const dateToday = new Date();
  const startDate = moment(dateToday.setMonth(dateToday.getMonth() - 6)).format(
    "YYYYMD"
  );
  const endDate = moment(new Date()).format("YYYYMD");

  console.log(startDate);
  console.log(endDate);
  //   const nDate = dateNow + "/" + (month + 1) + "/" + year;

  const getNecessaryExpense = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT dateMonth, SUM(amountBalance) FROM table_income where type=? and date >= ? and date<=? GROUP BY dateMonth ORDER BY date DESC ",
        ["expense", startDate, endDate],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setHistory(temp);
        }
      );
    });
  };
  console.log(getHistory);
  return (
    <Screen>
      <AppText>Hello World</AppText>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HistoryTransaction;
