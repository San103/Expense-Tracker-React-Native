import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";

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

function IncomeExpenses({ propUsername }) {
  const [balance, setBalance] = useState();

  const [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    transactions();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT SUM(amountBalance) as totalBal  FROM table_income",
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            const tot = results.rows.item(0).totalBal;
            const defaultValue = 0;

            if (tot === null) {
              setBalance(defaultValue.toFixed(2));
            } else {
              setBalance(tot.toFixed(2));
            }
          }
        }
      );
    });
  }, []);

  //get Transactions
  const transactions = () =>
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_income", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      });
    });
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
  //get Sum of the Balance from the username

  //getDimension
  const { height, width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  return (
    <Screen2>
      <UserNav
        image={require("../assets/man.png")}
        title="Welcome"
        subtitle={propUsername}
      />
      <LinearGradient
        style={styles.parentContainer}
        colors={["#ff00d4", "#00ddff", "#fbb040"]}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 1, y: 3 }}
      >
        <View style={styles.balanceContainer}>
          <AppText style={{ color: "#fff" }}>Total Balance</AppText>
          <AppText>
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
              <AppText
                style={{
                  color: "#fff",
                }}
              >
                $ 2000.00
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
              <AppText style={{ color: "#fff" }}>$ 8000.00</AppText>
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
                    : "coins"
                }
                Linearbackground={
                  item.category === "Salary"
                    ? "#EE0979"
                    : item.category === "Commission"
                    ? "#F33098"
                    : "#F717FF"
                }
                Linearbackground2={
                  item.category === "Salary"
                    ? "#9851E9"
                    : item.category === "Commission"
                    ? "#F63145"
                    : "#FB6186"
                }
                Linearbackground3={
                  item.category === "Salary"
                    ? "#4CA2CD"
                    : item.category === "Commission"
                    ? "#F67214"
                    : "#FB7C1B"
                }
                notitle={item.note}
                subtitle={item.amountBalance}
                DateTransac={item.date}
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
