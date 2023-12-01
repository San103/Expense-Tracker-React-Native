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
import Screen from "../components/Screen";
import Header from "./Expenses/Header";
import Icon from "../components/Icon";
import colors from "../config/colors";
import { VictoryPie } from "victory-native";
import moment from "moment";
import { DatabaseConnection } from "../components/Database/dbConnection";

const db = DatabaseConnection.getConnection();

function MyExpenses(props) {
  const [viewMode, setViewMode] = useState("expenses");
  const { height, width } = useWindowDimensions();
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const [category2, setCategory2] = useState([]);
  const [selectedCategory2, setSelectedCategory2] = useState();

  //Current Date to Display Default
  const dateToday = moment(new Date()).format("YYYYMMDD");
  const dateFirstMonth = moment().startOf("month").format("YYYYMMDD");

  useEffect(() => {
    getDateNow();
    getDateNow2();
  }, []);

  //get current date
  const getDateNow = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT date, color,income_id,category, SUM(amountBalance) as totalAmount FROM table_income where type=? and date >= ? and date <= ? group by category",
        ["expense", dateFirstMonth, dateToday],

        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setCategory(temp);
        }
      );
    });
  };

  //2
  const getDateNow2 = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT color,income_id,category, SUM(amountBalance) as totalAmount FROM table_income where type=? and date >= ? and date <= ? group by category",
        ["income", dateFirstMonth, dateToday],

        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setCategory2(temp);
        }
      );
    });
  };

  //3
  const categoryToDisplay2 = () => {
    let chartData = category2.map((item) => {
      return {
        name: item.category,
        y: item.totalAmount,
        totalCat: category.length,
        color: item.color,
        id: item.income_id,
      };
    });
    let totalExpense = chartData.reduce((a, b) => a + (b.y || 0), 0);

    let finalChart = chartData.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.totalCat,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChart;
  };

  //handle onClick to Chart
  const setSelectCategoryByName2 = (name) => {
    let categoryName = category2.filter((a) => a.category == name);
    setSelectedCategory2(categoryName[0]);
  };
  const renderChart2 = () => {
    let chartData = categoryToDisplay2();
    let colorScales = chartData.map((item) => item.color);

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VictoryPie
          data={chartData}
          colorScale={colorScales}
          labels={(datum) => `${datum.y}`}
          radius={({ datum }) =>
            selectedCategory2 && selectedCategory2.category == datum.name
              ? width * 0.4
              : width * 0.4 - 10
          }
          innerRadius={70}
          labelRadius={({ innerRadius }) => (width * 0.4 + innerRadius) / 2.5}
          style={{
            labels: { fill: "#fff", fontSize: 15, fontFamily: "NunitoMedium" },
            parent: {
              // shadowColor: "#b3aba2",
              // elevation: 5,
              borderRadius: width / 2,
            },
          }}
          width={width * 0.8}
          height={width * 0.8}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: "labels",
                      mutation: (props) => {
                        let categoryName = chartData[props.index].name;
                        setSelectCategoryByName2(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
        <View style={{ position: "absolute", top: "40%", left: "40%" }}>
          <AppText
            style={{ textAlign: "center", fontSize: 30, fontWeight: "700" }}
          >
            {category2.length}
          </AppText>
          <AppText style={{ textAlign: "center" }}>Expenses</AppText>
        </View>
      </View>
    );
  };
  const renderIncomeSummary2 = () => {
    let data = categoryToDisplay2();
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            height: 40,
            flexDirection: "row",
            paddingHorizontal: 20,
            borderRadius: 10,
            backgroundColor:
              selectedCategory2 && selectedCategory2.category == item.name
                ? item.color
                : "#fff",
          }}
          onPress={() => {
            let categoryTitle = item.name;
            setSelectCategoryByName2(categoryTitle);
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  selectedCategory2 && selectedCategory2.category == item.name
                    ? "#fff"
                    : item.color,
                borderRadius: 5,
              }}
            ></View>
            <AppText
              style={{
                marginLeft: 10,
                color:
                  selectedCategory2 && selectedCategory2.category == item.name
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
                  selectedCategory2 && selectedCategory2.category == item.name
                    ? "#fff"
                    : "gray",
              }}
            >
              {item.y} PHP - {item.label}
            </AppText>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ height: height - 280 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          ListHeaderComponent={
            <View>
              <View style={styles.graphContainer}>
                <AppText style={styles.textCat}>Income</AppText>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setViewMode("expenses")}>
                    <Icon
                      name={"tshirt"}
                      backgroundColor={
                        viewMode == "expenses" ? "#fcb045" : null
                      }
                      iconColor={
                        viewMode == "expenses" ? "#fff" : colors.primary
                      }
                      size={45}
                      bRadius={2}
                      styles={{ borderColor: "transparent" }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setViewMode("income")}>
                    <Icon
                      name={"credit-card"}
                      backgroundColor={
                        viewMode == "income" ? colors.primarySecondPair : null
                      }
                      iconColor={
                        viewMode == "income" ? "#fff" : colors.primarySecondPair
                      }
                      size={45}
                      bRadius={2}
                      styles={{ marginLeft: 10, borderColor: "transparent" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {renderChart2()}
            </View>
          }
        />
      </View>
    );
  };

  const categoryToDisplay = () => {
    let chartData = category.map((item) => {
      return {
        name: item.category,
        y: item.totalAmount,
        totalCat: category.length,
        color: item.color,
        id: item.income_id,
      };
    });
    let totalExpense = chartData.reduce((a, b) => a + (b.y || 0), 0);

    let finalChart = chartData.map((item) => {
      let percentage = ((item.y / totalExpense) * 100).toFixed(0);
      return {
        label: `${percentage}%`,
        y: Number(item.y),
        expenseCount: item.totalCat,
        color: item.color,
        name: item.name,
        id: item.id,
      };
    });
    return finalChart;
  };

  //handle onClick to Chart
  const setSelectCategoryByName = (name) => {
    let categoryName = category.filter((a) => a.category == name);
    setSelectedCategory(categoryName[0]);
  };
  const renderChart = () => {
    let chartData = categoryToDisplay();
    let colorScales = chartData.map((item) => item.color);

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VictoryPie
          data={chartData}
          colorScale={colorScales}
          labels={(datum) => `${datum.y}`}
          radius={({ datum }) =>
            selectedCategory && selectedCategory.category == datum.name
              ? width * 0.4
              : width * 0.4 - 10
          }
          innerRadius={70}
          labelRadius={({ innerRadius }) => (width * 0.4 + innerRadius) / 2.5}
          style={{
            labels: { fill: "#fff", fontSize: 15, fontFamily: "NunitoMedium" },
            parent: {
              // shadowColor: "#b3aba2",
              // elevation: 5,
              borderRadius: width / 2,
            },
          }}
          width={width * 0.8}
          height={width * 0.8}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPress: () => {
                  return [
                    {
                      target: "labels",
                      mutation: (props) => {
                        let categoryName = chartData[props.index].name;
                        setSelectCategoryByName(categoryName);
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
        <View style={{ position: "absolute", top: "40%", left: "40%" }}>
          <AppText
            style={{ textAlign: "center", fontSize: 30, fontWeight: "700" }}
          >
            {category.length}
          </AppText>
          <AppText style={{ textAlign: "center" }}>Expenses</AppText>
        </View>
      </View>
    );
  };
  const renderExpenseSummary = () => {
    let data = categoryToDisplay();
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            height: 40,
            flexDirection: "row",
            paddingHorizontal: 20,
            borderRadius: 10,
            backgroundColor:
              selectedCategory && selectedCategory.category == item.name
                ? item.color
                : "#fff",
          }}
          onPress={() => {
            let categoryTitle = item.name;
            setSelectCategoryByName(categoryTitle);
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  selectedCategory && selectedCategory.category == item.name
                    ? "#fff"
                    : item.color,
                borderRadius: 5,
              }}
            ></View>
            <AppText
              style={{
                marginLeft: 10,
                color:
                  selectedCategory && selectedCategory.category == item.name
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
                  selectedCategory && selectedCategory.category == item.name
                    ? "#fff"
                    : "gray",
              }}
            >
              {item.y} PHP - {item.label}
            </AppText>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ height: height - 280 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          ListHeaderComponent={
            <View>
              <View style={styles.graphContainer}>
                <AppText style={styles.textCat}>Expenses</AppText>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setViewMode("expenses")}>
                    <Icon
                      name={"tshirt"}
                      backgroundColor={
                        viewMode == "expenses" ? "#fcb045" : null
                      }
                      iconColor={
                        viewMode == "expenses" ? "#fff" : colors.primary
                      }
                      size={45}
                      bRadius={2}
                      styles={{ borderColor: "transparent" }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setViewMode("income")}>
                    <Icon
                      name={"credit-card"}
                      backgroundColor={
                        viewMode == "income" ? colors.primarySecondPair : null
                      }
                      iconColor={
                        viewMode == "income" ? "#fff" : colors.primarySecondPair
                      }
                      size={45}
                      bRadius={2}
                      styles={{ marginLeft: 10, borderColor: "transparent" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {renderChart()}
            </View>
          }
        />
      </View>
    );
  };

  return (
    <>
      <Header />
      <Screen style={{ paddingTop: 0 }}>
        <View>
          {viewMode == "expenses"
            ? renderExpenseSummary()
            : renderIncomeSummary2()}
        </View>
      </Screen>
    </>
  );
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

export default MyExpenses;
