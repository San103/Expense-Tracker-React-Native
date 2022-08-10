import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { DatabaseConnection } from "../components/Database/dbConnection";
import moment from "moment";
import { BarChart, LineChart } from "react-native-chart-kit";
import Icon from "../components/Icon";
import FormatNumber from "../components/FormatNumber";
import colors from "../config/colors";
import LottieView from "lottie-react-native";
import UnderMentainance from "../components/UnderMentainance";

const db = DatabaseConnection.getConnection();
function Predictions(props) {
  const animationProgress = useRef(new Animated.Value(0));
  const { height, width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState();
  const [getSwitch, setSwitch] = useState(true);
  const [getCount, setCount] = useState([]);
  const [getUnesserary, setUnessesary] = useState([]);
  useEffect(() => {
    Animated.loop(
      Animated.timing(animationProgress.current, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);
  useEffect(() => {
    getNecessaryExpense();
    getUnesseraryExpense();
  }, []);
  const monthNext = moment().endOf("month").add(1, "M").format("MMMM");
  const startOfMonth = moment().startOf("month").format("DD");
  const endOfMonth = moment().endOf("month").format("DD");
  //Current Date to Display Default

  //get Date Today default
  const dateToday = moment(new Date()).format("YYYYMMDD");
  const dateFirstMonth = moment().startOf("month").format("YYYYMMDD");
  //console.log(startOfMonth);

  const getNecessaryExpense = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT color,income_id,category,COUNT(category) as count,SUM(amountBalance) as total FROM table_income where type=? and date >= ? and date <= ? GROUP BY category ORDER BY count DESC LIMIT 4",
        ["expense", dateFirstMonth, dateToday],
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
        "SELECT color,income_id,category,COUNT(category) as count,SUM(amountBalance) as total FROM table_income where type=? and date >= ? and date <= ? GROUP BY category ORDER BY count ASC LIMIT 4",
        ["expense", dateFirstMonth, dateToday],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setUnessesary(temp);
        }
      );
    });
  };

  //   console.log(getCategory);
  const getNecessaryToDisplay = () => {
    let dataFromSql = getCount.map((item) => {
      return {
        category: item.category,
        count: item.count,
        total: item.total,
        color: item.color,
        id: item.income_id,
      };
    });
    let totalExpense = dataFromSql.reduce((a, b) => a + (b.total || 0), 0);

    let finalChartNecessary = dataFromSql.map((item) => {
      let percentage = ((item.total / totalExpense) * 100).toFixed(0);
      return {
        label: Number(percentage),
        category: item.category,
        count: item.count,
        total: item.total,
        color: item.color,
        id: item.id,
      };
    });
    return finalChartNecessary;
  };

  const getUnecessaryToDisplay = () => {
    let dataFromSql = getUnesserary.map((item) => {
      return {
        uncategory: item.category,
        uncount: item.count,
        untotal: item.total,
        color: item.color,
        unid: item.income_id,
      };
    });
    let totalExpense = dataFromSql.reduce((a, b) => a + (b.untotal || 0), 0);

    let finalChartNecessary = dataFromSql.map((item) => {
      let percentage = ((item.untotal / totalExpense) * 100).toFixed(0);
      return {
        label: Number(percentage),
        uncategory: item.uncategory,
        uncount: item.uncount,
        untotal: item.untotal,
        color: item.color,
        unid: item.unid,
      };
    });
    return finalChartNecessary;
  };
  //handle onClick to Chart
  const setSelectCategoryByName = (name) => {
    let main = getNecessaryToDisplay();
    let categoryName = main.filter((a) => a.label == name);
    setSelectedCategory(categoryName[0]);
  };
  const renderBarChartNecessary = () => {
    let catDisplay = getNecessaryToDisplay();
    let getCategoryPecent = catDisplay.map((item) => item.label);
    let getCategoryName = catDisplay.map((item) => item.category);
    let getCategoryTotal = catDisplay.map((item) => item.total);
    return (
      <>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LineChart
            data={{
              labels: getCategoryName,
              datasets: [
                {
                  data: getCategoryPecent,
                },
              ],
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={250}
            yAxisLabel=""
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#FB6186",
              backgroundGradientTo: "#FB7C1B",
              decimalPlaces: 0, // optional, defaults to 2dp
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
              backgroundColor: "transparent",
              shadowColor: "gray",
              elevation: 5,
            }}
            onDataPointClick={({ value, getColor, x, y, index }) => {
              let categoryName = value;
              setSelectCategoryByName(categoryName);
              // setAxis([x, y]);
              // setVal(value);
              // return setModalVisible(true);
            }}
          />
        </View>
      </>
    );
  };
  const renderBarChartUnecessary = () => {
    let catDisplay = getUnecessaryToDisplay();
    let getCategoryName = catDisplay.map((item) => item.uncategory);
    let getCategoryPecent = catDisplay.map((item) => item.label);
    let getCategoryTotal = catDisplay.map((item) => item.untotal);
    return (
      <>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <BarChart
            data={{
              labels: getCategoryName,
              datasets: [
                {
                  data: getCategoryPecent,
                },
              ],
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={250}
            yAxisLabel=""
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#4CA2CD",
              backgroundGradientTo: "#EE0979",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#EE0979",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              shadowColor: "gray",
              elevation: 5,
            }}
          />
        </View>
      </>
    );
  };
  const renderBarFlatList = () => {
    let dataFrom = getNecessaryToDisplay();
    const getSortedState = dataFrom.sort(
      (a, b) => parseInt(b.label) - parseInt(a.label)
    );
    let catDisplay = getNecessaryToDisplay();
    let totalExpense = catDisplay.reduce((a, b) => a + (b.total || 0), 0);
    let getCategoryLength = getCount.length;
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            height: 50,
            borderRadius: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            paddingHorizontal: 20,
            backgroundColor:
              selectedCategory && selectedCategory.total == item.total
                ? item.color
                : "#fff",
          }}
          onPress={() => {
            let categoryTitle = item.label;
            setSelectCategoryByName(categoryTitle);
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor:
                  selectedCategory && selectedCategory.total == item.total
                    ? "#fff"
                    : item.color,
                borderRadius: 5,
              }}
            ></View>
            <AppText
              style={{
                marginLeft: 10,
                color:
                  selectedCategory && selectedCategory.total == item.total
                    ? "#fff"
                    : colors.dark,
              }}
            >
              {item.category}
            </AppText>
          </View>
          <View style={{ justifyContent: "center" }}>
            <AppText
              style={{
                color:
                  selectedCategory && selectedCategory.total == item.total
                    ? "#fff"
                    : "gray",
              }}
            >
              ₱{item.total} - {item.label}%
            </AppText>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ height: height - 80, marginTop: 20 }}>
        {getCategoryLength < 2 ? (
          <UnderMentainance />
        ) : (
          <FlatList
            data={getSortedState}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            ListHeaderComponent={
              <Screen>
                <View
                  style={{
                    marginTop: 18,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <AppText style={styles.statisticsTitle}>
                      Necessary Expenses
                    </AppText>

                    <AppText style={styles.statisticsDate}>
                      Prediction for {monthNext}
                    </AppText>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setSwitch(!getSwitch);
                    }}
                  >
                    <Icon
                      name={getSwitch === true ? "chart-line" : "chart-bar"}
                      backgroundColor={
                        getSwitch === true
                          ? colors.primarySecond
                          : colors.primarySecondPair
                      }
                      iconColor={"#fff"}
                      size={45}
                      bRadius={2}
                      styles={{ borderColor: "transparent" }}
                    />
                  </TouchableOpacity>
                </View>
                {renderBarChartNecessary()}
                <View
                  style={[
                    styles.containerParent,
                    { width: width - 20, height: height - 900 },
                  ]}
                >
                  <View style={styles.predictStyle}>
                    <View style={{ alignItems: "center" }}>
                      <AppText>Predicted Amount</AppText>
                      <AppText style={styles.amountPredicted}>
                        <FormatNumber
                          value2={totalExpense.toFixed(2)}
                          color={"#FB6186"}
                          size={25}
                          styles={{ fontFamily: "NunitoBold" }}
                        />
                      </AppText>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <AppText>No. of Categories </AppText>
                      <AppText style={styles.amountPredicted}>
                        {getCategoryLength}
                      </AppText>
                    </View>
                  </View>
                </View>
                <AppText style={{ fontSize: 18 }}>Predicted Categories</AppText>
              </Screen>
            }
          />
        )}
      </View>
    );
  };
  const renderUnBarFlatList = () => {
    let dataFrom = getUnecessaryToDisplay();
    let catDisplay = getUnecessaryToDisplay();
    let totalExpense = catDisplay.reduce((a, b) => a + (b.untotal || 0), 0);
    let getCategoryLength = getUnesserary.length;
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            height: 50,
            borderRadius: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            paddingHorizontal: 20,
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: item.color,
                borderRadius: 5,
              }}
            ></View>
            <AppText
              style={{
                marginLeft: 10,
                color: "gray",
              }}
            >
              {item.uncategory}
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
              ₱{item.untotal} - {item.label}%
            </AppText>
          </View>
        </View>
      );
    };

    return (
      <View style={{ height: height - 80, marginTop: 20 }}>
        <FlatList
          data={dataFrom}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.unid}`}
          ListHeaderComponent={
            <Screen>
              <View
                style={{
                  marginTop: 18,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <AppText style={styles.statisticsTitle}>
                    Unnecessary Expenses
                  </AppText>

                  <AppText style={styles.statisticsDate}>
                    Prediction for {monthNext}
                  </AppText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSwitch(!getSwitch);
                  }}
                >
                  <Icon
                    name={getSwitch === true ? "chart-line" : "chart-bar"}
                    backgroundColor={
                      getSwitch === true
                        ? colors.primarySecond
                        : colors.primarySecondPair
                    }
                    iconColor={"#fff"}
                    size={45}
                    bRadius={2}
                    styles={{ borderColor: "transparent" }}
                  />
                </TouchableOpacity>
              </View>
              {renderBarChartUnecessary()}
              <View
                style={[
                  styles.containerParent,
                  { width: width - 20, height: height - 900 },
                ]}
              >
                <View style={styles.predictStyle}>
                  <View style={{ alignItems: "center" }}>
                    <AppText>Predicted Amount</AppText>
                    <AppText style={styles.amountPredicted}>
                      <FormatNumber
                        value2={totalExpense.toFixed(2)}
                        color={"#FB6186"}
                        size={25}
                        styles={{ fontFamily: "NunitoBold" }}
                      />
                    </AppText>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <AppText>No. of Categories </AppText>
                    <AppText style={styles.amountPredicted}>
                      {getCategoryLength}
                    </AppText>
                  </View>
                </View>
              </View>
              <AppText style={{ fontSize: 18 }}>Predicted Categories</AppText>
            </Screen>
          }
        />
      </View>
    );
  };
  return getSwitch === true ? renderBarFlatList() : renderUnBarFlatList();
}

const styles = StyleSheet.create({
  containerParent: {
    flexDirection: "column",
    alignSelf: "center",
    backgroundColor: colors.white,
    marginVertical: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 12,
    shadowColor: "white",
    elevation: 5,
  },
  predictStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  amountPredicted: {
    marginVertical: 10,
    fontFamily: "NunitoBold",
    color: colors.primarySecond,
    fontSize: 25,
  },
  statisticsTitle: {
    color: colors.dark,
    fontSize: 25,
    fontFamily: "NunitoBold",
  },
  statisticsDate: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: "NunitoMedium",
  },
});

export default Predictions;
