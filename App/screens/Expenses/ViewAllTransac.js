import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  BackHandler,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import ListTransaction from "../../components/ListTransactions";
import { DatabaseConnection } from "../../components/Database/dbConnection";
import AppText from "../../components/AppText";
import Icon from "../../components/Icon";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const db = DatabaseConnection.getConnection();
function ViewAllTransac(props) {
  const [flatListItems, setFlatListItems] = useState([]);
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  function handleBackButtonClick() {
    navigation.push("HomeNav");
    return true;
  }

  useEffect(() => {
    transac();
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
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
  //get Date Today default
  const todaysDate = new Date();
  const dateToday = moment(todaysDate.setMonth(todaysDate.getMonth())).format(
    "YYYYMMDD"
  );
  const yesterday = moment().subtract(1, "days");
  const dateYesterday = moment(yesterday).format("YYYYMMDD");

  return (
    <Screen>
      <View style={{ height: height - 45, marginTop: 25 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.push("HomeNav");
            }}
          >
            <Icon
              size={50}
              name="chevron-left"
              backgroundColor="transparent"
              styles={{ borderWidth: 0 }}
              iconColor={colors.dark}
            />
          </TouchableOpacity>
          <AppText
            style={{
              fontSize: 20,
              fontFamily: "NunitoMedium",
              marginVertical: 20,
            }}
          >
            All Transactions
          </AppText>
        </View>
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
                  : moment(item.date).format("MMM. DD, YYYY")
              }
              inputUserIdPassed={item.income_id}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ViewAllTransac;
