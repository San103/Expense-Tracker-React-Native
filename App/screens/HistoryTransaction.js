import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  Modal,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import moment from "moment";
import { LineChart } from "react-native-chart-kit";
import CustoModal from "../components/CustoModal";
import { DatabaseConnection } from "../components/Database/dbConnection";

const db = DatabaseConnection.getConnection();

function HistoryTransaction(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [getAxis, setAxis] = useState([null, null]);
  const [getValue, setVal] = useState(null);
  const { height, width } = useWindowDimensions();
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

  // console.log(startDate);
  // console.log(endDate);
  //   const nDate = dateNow + "/" + (month + 1) + "/" + year;

  const getNecessaryExpense = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT color,income_id,dateMonth, SUM(amountBalance) as Total FROM table_income where type=? and date >= ? and date<=? GROUP BY dateMonth ORDER BY date DESC ",
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
  const NecessaryDisplay = () => {
    let barData = getHistory.map((item) => {
      return {
        name: item.dateMonth,
        total: item.Total,
        color: item.color,
        id: item.income_id,
      };
    });
    return barData;
  };

  const renderChartHistory = () => {
    const barDataFinal = NecessaryDisplay();
    const getMonth = barDataFinal.map((item) => item.name);
    const getTotal = barDataFinal.map((item) => item.total);
    const getLength = barDataFinal.map((item) => item.length);

    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {getLength < 2 ? (
          <AppText>Please add more Month Expenses</AppText>
        ) : (
          <LineChart
            data={{
              labels: getMonth,
              datasets: [
                {
                  data: getTotal,
                },
              ],
              legend: ["Montly Statistics"],
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={300}
            yAxisLabel="₱"
            yAxisSuffix=""
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
            onDataPointClick={({ value, getColor, x, y, index }) => {
              let categoryName = value;
              setSelectCategoryByName(categoryName);
              setAxis([x, y]);
              setVal(value);
              return setModalVisible(true);
            }}
          />
        )}
      </View>
    );
  };
  //handle onClick to Chart
  const setSelectCategoryByName = (name) => {
    let categoryName = getHistory.filter((a) => a.Total == name);
    setSelectedCategory(categoryName[0]);
  };
  const renderFlatList = () => {
    let dataFrom = NecessaryDisplay();
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            height: 50,
            flexDirection: "row",
            paddingHorizontal: 20,
            borderRadius: 10,
            marginHorizontal: 20,
            backgroundColor:
              selectedCategory && selectedCategory.Total == item.total
                ? item.color
                : "#fff",
          }}
          onPress={() => {
            let categoryTitle = item.total;
            setSelectCategoryByName(categoryTitle);
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  selectedCategory && selectedCategory.Total == item.total
                    ? "#fff"
                    : item.color,
                borderRadius: 5,
              }}
            ></View>
            <AppText
              style={{
                marginLeft: 10,
                color:
                  selectedCategory && selectedCategory.Total == item.total
                    ? "#fff"
                    : "gray",
              }}
            >
              {item.name}
            </AppText>
          </View>
          <View style={{ justifyContent: "center" }}>
            <AppText
              style={{
                color:
                  selectedCategory && selectedCategory.Total == item.total
                    ? "#fff"
                    : "gray",
              }}
            >
              ₱{item.total}
            </AppText>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ height: height - 80 }}>
        <FlatList
          data={dataFrom}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          ListHeaderComponent={
            <Screen>
              <AppText style={styles.statisticsTitle}>
                Transaction History
              </AppText>
              <AppText style={styles.statisticsDate}>
                From current to the last month transactions.
              </AppText>
              {renderChartHistory()}
              <AppText style={{ marginTop: 20, fontSize: 18 }}>Month</AppText>
            </Screen>
          }
        />
      </View>
    );
  };
  //console.log(getTotal);
  return (
    <>
      {renderFlatList()}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              backgroundColor: "rgba(0, 0, 0, 0.0)",
            }}
          >
            <View
              style={{
                width: 60,
                height: 30,
                top: getAxis[1] + 50,
                left: getAxis[0],
                borderRadius: 10,
                position: "absolute",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                justifyContent: "center",
              }}
            >
              <AppText style={{ color: "white", textAlign: "center" }}>
                ₱{getValue}
              </AppText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  statisticsTitle: {
    marginTop: 20,
    fontSize: 25,
    fontFamily: "NunitoBold",
  },
  statisticsDate: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: "NunitoMedium",
  },
});

export default HistoryTransaction;
