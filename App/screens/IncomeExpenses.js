import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ToastAndroid,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import AppText from "../components/AppText";
import UserNav from "./Home/UserNav";
import ListTransaction from "../components/ListTransactions";
import Screen2 from "../components/Screen";
import FormatNumber from "../components/FormatNumber";
import ExpenseCat from "./AddIncomeExpense/DataCategories/ExpenseCat";
import ExpenseCatHome from "../components/IncomeExpenseComp/ExpenseCatHome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { DatabaseConnection } from "../components/Database/dbConnection";

const db = DatabaseConnection.getConnection();

//For github badges only hahhaha
//Add All item for List
const addAll = {
  label: "All",
  value: 0,
  icon: "list-ul",
  backgroundColor: "#FFCDA5",
  backgroundColor1: "#EE4D5F",
  backgroundColor2: "#FF5B94",
};
//function to add the value into the array
const insert = (arr, index, ...newItems) => [
  ...arr.slice(0, index),
  ...newItems,
  ...arr.slice(index),
];
const result = insert(ExpenseCat, 0, addAll);

//Reducer for useReducer
const reducer = (state, action) => {
  switch (action.type) {
    case "error":
      return {
        expenseList: [],
      };
    case "loading":
      return {
        expenseList: console.log("Looading..."),
      };
    case "all":
      return {
        expenseList: action.payload,
      };
    case "Clothes":
      return {
        expenseList: action.payload,
      };
    case "Foods":
      return {
        expenseList: action.payload,
      };
    case "Fuel":
      return {
        expenseList: action.payload,
      };
    case "Gadget":
      return {
        expenseList: action.payload,
      };
    case "Others":
      return {
        expenseList: action.payload,
      };
    case "School":
      return {
        expenseList: action.payload,
      };
    case "Transportation":
      return {
        expenseList: action.payload,
      };
    case "Utility Bill":
      return {
        expenseList: action.payload,
      };
    default:
      return console.log("No record");
  }
};
//transac();
function IncomeExpenses() {
  const [state, dispatch] = useReducer(reducer, { expenseList: [] });
  const [balance, setBalance] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [flatListItems, setFlatListItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch({ type: "loading" });
    transac().then((listExpense) => {
      dispatch({
        type: "all",
        payload: listExpense,
      });
    });
    getTotalBal();
    getUsername().then((user) => {
      setUsername(user);
    });
  }, []);

  //get Date Today default
  const dateToday = moment(new Date()).format("YYYYMMDD");
  const yesterday = moment().subtract(1, "days");
  const dateYesterday = moment(yesterday).format("YYYYMMDD");
  //get Transactions
  const transac = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM table_income", [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
            resolve(temp);
            setFlatListItems(temp);
          }
        });
      });
    });
  };

  // get Total Balance
  const getTotalBal = () =>
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT SUM(amountBalance) as totalBal  FROM table_income where type=?",
        ["income"],

        (tx, results) => {
          tx.executeSql(
            "SELECT SUM(amountBalance) as expenseBal  FROM table_income where type=?",
            ["expense"],
            (tx, results2) => {
              if (results.rows.length > 0) {
                if (results2.rows.length > 0) {
                  const totExpense = results2.rows.item(0).expenseBal;
                  const totIncome = results.rows.item(0).totalBal;
                  const total = totIncome - totExpense;
                  const defaultValue = 0;
                  if (totExpense === null) {
                    setTotalExpense(defaultValue.toFixed(2));
                  } else {
                    setTotalExpense(totExpense.toFixed(2));
                  }
                  if (totIncome === null) {
                    setBalance(defaultValue.toFixed(2));
                    setTotalIncome(defaultValue.toFixed(2));
                  } else {
                    setBalance(total.toFixed(2));
                    setTotalIncome(totIncome.toFixed(2));
                  }
                }
              }
            }
          );
        }
      );
    });

  //get Username
  const getUsername = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql("SELECT username FROM table_user", [], (tx, results) => {
          if (results.rows.length > 0) {
            const tot = results.rows.item(0).username;
            resolve(tot);
          }
        });
      });
    });
  };

  //Delete all Transactions
  const deleteTransactions = () =>
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM table_income", [], (tx, results) => {
        if (results.rowsAffected > 0) {
          console.log("Delete Success");
        } else {
          alert("404 not Found !");
        }
      });
    });

  //get Category when Clicked
  const setSelectCategoryByName = (name) => {
    if (name === "All") {
      dispatch({ type: "all", payload: flatListItems });
    } else {
      let categoryName = flatListItems.filter((a) => a.category == name);
      //console.log(state.expenseList);
      if (categoryName == "") {
        dispatch({ type: "error" });
        ToastAndroid.show("No Record for " + name, ToastAndroid.SHORT);
      } else {
        dispatch({ type: name, payload: categoryName });
      }
    }
  };
  //console.log(flatListItems);
  const renderItemClicked = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.containerRender]}
        onPress={() => {
          let categoryTitle = item.label;
          setSelectCategoryByName(categoryTitle);
        }}
      >
        <LinearGradient
          style={styles.LGStyle}
          colors={[
            item.backgroundColor,
            item.backgroundColor1,
            item.backgroundColor2,
          ]}
          start={{ x: 0, y: 0.2 }}
          end={{ x: 0.8, y: 1.2 }}
        >
          <FontAwesome5Icon
            name={item.icon}
            size={60 * 0.4}
            color="#fff"
            style={styles.icon}
          />
        </LinearGradient>
        <AppText style={[styles.textCategory]}>{item.label}</AppText>
      </TouchableOpacity>
    );
  };
  //getDimension
  const { height, width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  return (
    <Screen2>
      <UserNav
        image={require("../assets/iconPerson.png")}
        title="Welcome"
        subtitle={username}
      />
      <LinearGradient
        style={styles.parentContainer}
        colors={["#ff00d4", "#00ddff", "#fbb040"]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}
      >
        <View style={styles.balanceContainer}>
          <AppText style={{ color: "#fff" }}>
            {balance < 0 ? "Debt" : "Total Balance"}
          </AppText>
          <AppText style={{ marginTop: 10 }}>
            <FormatNumber
              value2={balance}
              color={balance < 0 ? "#fd1d1d" : "#fff"}
            />
          </AppText>
        </View>
        <View style={styles.parentIncomeContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowdown" color="#25F333" size={30 * 0.5} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <AppText style={{ color: "#fff", fontSize: 12 }}>Income</AppText>
              <AppText>
                <FormatNumber value2={totalIncome} size={15} />
              </AppText>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="arrowup" color="#FB5D5D" size={30 * 0.5} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <AppText style={{ color: "#fff", fontSize: 12 }}>
                Expenses
              </AppText>
              <AppText>
                <FormatNumber value2={totalExpense} size={15} />
              </AppText>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={{ marginBottom: 10 }}>
        <AppText>Expense Categories</AppText>
        <View style={{ marginTop: 15 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={result}
            keyExtractor={(ExpenseCat) => ExpenseCat.value.toString()}
            renderItem={renderItemClicked}
          />
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText>Transactions</AppText>
          <TouchableOpacity
            onPress={() => navigation.push("ViewAllTransactions")}
          >
            <AppText style={{ color: "gray", fontSize: 12 }}>View All</AppText>
          </TouchableOpacity>
        </View>

        <View style={{ height: height - 560, marginTop: 15 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={state.expenseList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ListTransaction
                title={item.category}
                name={
                  item.category === "Salary"
                    ? "hand-holding-usd"
                    : item.category === "Commission"
                    ? "credit-card"
                    : item.category === "Allowance"
                    ? "coins"
                    : item.category === "Clothes"
                    ? "tshirt"
                    : item.category === "Foods"
                    ? "utensils"
                    : item.category === "Gadget"
                    ? "mobile"
                    : item.category === "School"
                    ? "school"
                    : item.category === "Fuel"
                    ? "gas-pump"
                    : item.category === "Others"
                    ? "comment-dots"
                    : item.category === "Transportation"
                    ? "car"
                    : item.category === "Utility Bill"
                    ? "newspaper"
                    : "car"
                }
                Linearbackground={
                  item.category === "Salary"
                    ? "#EE0979"
                    : item.category === "Commission"
                    ? "#F33098"
                    : item.category === "Allowance"
                    ? "#F717FF"
                    : item.category === "Clothes"
                    ? "#F614DF"
                    : item.category === "Foods"
                    ? "#34C8E6"
                    : item.category === "Fuel"
                    ? "#4CA2CD"
                    : item.category === "Gadget"
                    ? "#F717FF"
                    : item.category === "Others"
                    ? "#fcb045"
                    : item.category === "School"
                    ? "#F33098"
                    : item.category === "Transportation"
                    ? "#CDF138"
                    : "#F66031"
                }
                Linearbackground2={
                  item.category === "Salary"
                    ? "#9851E9"
                    : item.category === "Commission"
                    ? "#F63145"
                    : item.category === "Allowance"
                    ? "#FB6186"
                    : item.category === "Clothes"
                    ? "#2A69FC"
                    : item.category === "Foods"
                    ? "#4A5AE9"
                    : item.category === "Fuel"
                    ? "#9851E9"
                    : item.category === "Gadget"
                    ? "#FB6186"
                    : item.category === "Others"
                    ? "#fd1d1d"
                    : item.category === "School"
                    ? "#F63145"
                    : item.category === "Transportation"
                    ? "#EB9A3D"
                    : "#FBBB28"
                }
                Linearbackground3={
                  item.category === "Salary"
                    ? "#4CA2CD"
                    : item.category === "Commission"
                    ? "#F67214"
                    : item.category === "Allowance"
                    ? "#FB7C1B"
                    : item.category === "Clothes"
                    ? "#14F6EE"
                    : item.category === "Foods"
                    ? "#EC6EAD"
                    : item.category === "Fuel"
                    ? "#EE0979"
                    : item.category === "Gadget"
                    ? "#FB7C1B"
                    : item.category === "Others"
                    ? "#833ab4"
                    : item.category === "School"
                    ? "#F67214"
                    : item.category === "Transportation"
                    ? "#FF36A8"
                    : "#B3F614"
                }
                notitle={item.note}
                subtitle={
                  item.type === "income"
                    ? "+ " + item.amountBalance
                    : "- " + item.amountBalance
                }
                titleColor={
                  item.type === "income"
                    ? { color: "green" }
                    : { color: "#F63145" }
                }
                DateTransac={
                  item.date === dateToday
                    ? "Today"
                    : item.date === dateYesterday
                    ? "Yesterday"
                    : moment(item.date).format("MMM. DD, YYYY")
                }
                inputUserIdPassed={item.income_id}
              />
            )}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        </View>
      </View>
    </Screen2>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: "column",
    borderRadius: 20,
    marginVertical: 25,
    shadowColor: "grey",
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 8,
  },
  balanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  parentIncomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  containerRender: {
    height: 100,
    marginHorizontal: 10,
    width: 60,
  },
  LGStyle: {
    height: 60,
    width: 60,
    flexDirection: "row",
    borderRadius: 60 / 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#b3aba2",
    elevation: 5,
  },
  textCategory: {
    color: "#9E9E9E",
    textAlignVertical: "center",
    alignSelf: "center",
    height: 35,
    fontSize: 12,
  },
  icon: {
    justifyContent: "center",
  },
});

export default IncomeExpenses;
