import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import Icon from "../components/Icon";
import AddIncome from "./AddIncomeExpense/AddIncome";
import AddExpense from "./AddIncomeExpense/AddExpense";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

function AddIncomeExpenseNav(props) {
  const navigation = useNavigation();

  function handleBackButtonClick() {
    navigation.push("HomeNav");
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            height: 100,
          },
          headerTitleAlign: "center",
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: "absolute",
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 15,
          },
          headerTitleStyle: {
            fontFamily: "NunitoMedium",
          },
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.push("HomeNav");
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
          ),
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => {
          //       props.navigation.navigate("AstronotUnderMentainance");
          //     }}
          //   >
          //     <Icon
          //       size={40}
          //       name="question"
          //       backgroundColor="white"
          //       iconColor={colors.dark}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
      >
        <Tab.Screen
          name="Income"
          component={Income}
          options={{
            tabBarActiveTintColor: "#FFA200",
            headerTitle: "Add Income",
            tabBarIcon: ({ focused }) => (
              <View style={styles.centeringIcon}>
                <FontAwesome5Icon
                  name="wallet"
                  size={25}
                  color={focused ? "#FFA200" : "#C9C9C9"}
                ></FontAwesome5Icon>
              </View>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Expense"
          component={Expense}
          options={{
            tabBarActiveTintColor: "#FF3A68",
            headerTitle: "Add Expense",
            tabBarIcon: ({ focused }) => (
              <View style={styles.centeringIcon}>
                <FontAwesome5Icon
                  name="money-bill-wave"
                  size={25}
                  color={focused ? "#FF3A68" : "#C9C9C9"}
                ></FontAwesome5Icon>
              </View>
            ),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
}
const Income = () => <AddIncome />;
const Expense = () => <AddExpense />;

const styles = StyleSheet.create({
  container: {},
});

export default AddIncomeExpenseNav;
