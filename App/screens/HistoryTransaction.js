import React, { useState, useEffect, useReducer } from "react";
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
import UnderMentainance from "../components/UnderMentainance";

const db = DatabaseConnection.getConnection();

//React Reducer for expense List
const reducer = (state, action) => {
  switch (action.type) {
    case "error":
      return {
        expenseList: [],
      };
    case "all":
      return {
        expenseList: action.payload,
      };
    case "January":
      return {
        expenseList: action.payload,
      };
    case "February":
      return {
        expenseList: action.payload,
      };
    case "March":
      return {
        expenseList: action.payload,
      };
    case "April":
      return {
        expenseList: action.payload,
      };
    case "May":
      return {
        expenseList: action.payload,
      };
    case "June":
      return {
        expenseList: action.payload,
      };
    case "July":
      return {
        expenseList: action.payload,
      };
    case "August":
      return {
        expenseList: action.payload,
      };
    case "September":
      return {
        expenseList: action.payload,
      };
    case "October":
      return {
        expenseList: action.payload,
      };
    case "November":
      return {
        expenseList: action.payload,
      };
    case "December":
      return {
        expenseList: action.payload,
      };
    default:
      return console.log("No record");
  }
};
function HistoryTransaction(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, dispatch] = useReducer(reducer, { expenseList: [] });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCategory2, setSelectedCategory2] = useState([]);
  const [selectedCategory3, setSelectedCategory3] = useState([]);
  const [getAxis, setAxis] = useState([null, null]);
  const [getValue, setVal] = useState(null);
  const { height, width } = useWindowDimensions();
  const [getHistory, setHistory] = useState([]);
  const [getCat, setCat] = useState();
  const [getMontlyCat, setMontlyCat] = useState([]);

  useEffect(() => {
    getNecessaryExpense();

    getMontlyCategories();
  }, []);
  //Current Date to Display Default
  const dateToday = new Date();
  const startDate = moment(dateToday.setMonth(dateToday.getMonth() - 6)).format(
    "YYYYMMDD"
  );
  const endDate = moment(new Date()).format("YYYYMMDD");
  const getNecessaryExpense = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT color,income_id,dateMonth, category, SUM(amountBalance) as Total FROM table_income where type=? and date >= ? and date<=? GROUP BY dateMonth ORDER BY date DESC ",
        ["expense", startDate, endDate],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          dispatch({
            type: "all",
            payload: temp,
          });
          setHistory(temp);
        }
      );
    });
  };
  //console.log(getHistory);
  const getMontlyCategories = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT category,income_id,dateMonth,SUM(amountBalance) as Total FROM table_income where type=? and date >= ? and date<=?  GROUP BY category  ORDER BY date DESC ",
        ["expense", startDate, endDate],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setMontlyCat(temp);
        }
      );
    });
  };

  //console.log(getMontlyCat);
  const NecessaryDisplay = () => {
    let barData = state.expenseList.map((item) => {
      return {
        name: item.dateMonth,
        category: item.category,
        total: item.Total,
        color: item.color,
        id: item.income_id,
      };
    });
    return barData;
  };

  const chartFlatlistDefault = () => {
    let barData = getHistory.map((item) => {
      return {
        name: item.dateMonth,
        category: item.category,
        total: item.Total,
        color: item.color,
        id: item.income_id,
      };
    });
    return barData;
  };

  const renderChartHistory = () => {
    const barDataFinal = NecessaryDisplay();
    const getCategories = barDataFinal.map((item) => item.category);
    const getMonth = barDataFinal.map((item) => item.name);
    const getTotal = barDataFinal.map((item) => item.total);
    const getLength = barDataFinal.map((item) => item.length);

    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {getLength < 2 ? (
          <AppText style={{ fontFamily: "NunitoBold", textAlign: "center" }}>
            No Chart to display, please add more expense for other month
          </AppText>
        ) : (
          <LineChart
            data={{
              labels: selectedCategory == "" ? getMonth : getCategories,
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
              setSelectCategoryByName2(value);
              getValueName(value);
              setAxis([x, y]);
              setVal(value);
              return setModalVisible(true);
            }}
          />
        )}
      </View>
    );
  };
  const getValueName = (total) => {
    let categoryTotal = selectedCategory.filter((a) => a.Total == total);
    setSelectedCategory3(categoryTotal[0]);
  };
  const setSelectCategoryByName2 = (name) => {
    let categoryTotal = getHistory.filter((a) => a.Total == name);
    setSelectedCategory2(categoryTotal[0]);
  };
  const setSelectCategoryByName = (name) => {
    let categoryName = getMontlyCat.filter((a) => a.dateMonth == name);
    let categoryTotal = getHistory.filter((a) => a.dateMonth == name);
    dispatch({ type: name, payload: categoryName });
    setSelectedCategory(categoryName);
    setSelectedCategory2(categoryTotal[0]);
    setSelectedCategory3([]);
  };

  const renderFlatList = () => {
    let dataFrom = chartFlatlistDefault();
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
              (selectedCategory2 && selectedCategory2.Total == item.total) ||
              (selectedCategory3 && selectedCategory3.dateMonth == item.name)
                ? item.color
                : "#fff",
          }}
          onPress={() => {
            let categoryTitle = item.name;
            //console.log(categoryTitle);
            setSelectCategoryByName(categoryTitle);
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  (selectedCategory2 &&
                    selectedCategory2.Total == item.total) ||
                  (selectedCategory3 &&
                    selectedCategory3.dateMonth == item.name)
                    ? "#fff"
                    : item.color,
                borderRadius: 5,
              }}
            ></View>
            <AppText
              style={{
                marginLeft: 10,
                color:
                  (selectedCategory2 &&
                    selectedCategory2.Total == item.total) ||
                  (selectedCategory3 &&
                    selectedCategory3.dateMonth == item.name)
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
                  (selectedCategory2 &&
                    selectedCategory2.Total == item.total) ||
                  (selectedCategory3 &&
                    selectedCategory3.dateMonth == item.name)
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
      <View style={{ height: height - 80, marginTop: 20 }}>
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
                top: getAxis[1] + 100,
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
