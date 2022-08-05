import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../components/AppText";
import UserNav from "./Home/UserNav";
import ListTransaction from "../components/ListTransactions";
import Screen2 from "../components/Screen";
import FormatNumber from "../components/FormatNumber";
import ExpenseCat from "./AddIncomeExpense/DataCategories/ExpenseCat";
import ExpenseCatHome from "../components/IncomeExpenseComp/ExpenseCatHome";
import AsyncRetrieveData from "../components/AsyncRetrieveData";
import { DatabaseConnection } from "../components/Database/dbConnection";

const listTransac = () => [
  {
    id: 1,
    title: "Food",
    note: "whatever",
    name: "fast-food",
    Linearbackground2: "#ef4136",
    Linearbackground: "#fbb040",
    subtitle: "-$ 400.00",
    DateTransac: "Today",
  },
];

const db = DatabaseConnection.getConnection();

function IncomeExpenses() {
  const [balance, setBalance] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [totalExpense, setTotalExpense] = useState();
  const [username, setUsername] = useState();

  const [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    transac();
    getTotalBal();
    getUsername();
  }, []);
  //Current Date to Display Default
  const dateNow = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const dateToday = dateNow + "/" + (month + 1) + "/" + year;
  const dateYesterday = dateNow - 1 + "/" + (month + 1) + "/" + year;
  //get Transactions
  const transac = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_income", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
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
    db.transaction((tx) => {
      tx.executeSql("SELECT username FROM table_user", [], (tx, results) => {
        if (results.rows.length > 0) {
          const tot = results.rows.item(0).username;
          setUsername(tot);
        }
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

  //getDimension
  const { height, width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  return (
    <Screen2>
      <UserNav
        image={require("../assets/man.png")}
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
          <AppText style={{ color: "#fff" }}>Total Balance</AppText>
          <AppText style={{ marginTop: 10 }}>
            <FormatNumber value2={balance} />
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
            data={ExpenseCat}
            keyExtractor={(ExpenseCat) => ExpenseCat.value.toString()}
            renderItem={({ item }) => (
              <ExpenseCatHome
                bg1={item.backgroundColor}
                bg2={item.backgroundColor1}
                bg3={item.backgroundColor2}
                icon={item.icon}
                label={item.label}
              />
            )}
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
          <AppText>Recent Transactions</AppText>
          <AppText style={{ color: "gray", fontSize: 12 }}>View All</AppText>
        </View>

        <View style={{ height: height - 560, marginTop: 15 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal={false}
            data={flatListItems}
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
                    : item.category === "Gifts"
                    ? "gift"
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
                    : item.category === "Gifts"
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
                    : item.category === "Gifts"
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
                    : item.category === "Gifts"
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
                    : item.date
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
});

export default IncomeExpenses;
