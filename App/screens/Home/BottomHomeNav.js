import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Local Import
import IncomeExpenses from "../IncomeExpenses";
import ViewAllUser from "../ViewAllUsers";
import RetrieveData from "../RetrieveData";
import { useRoute } from "@react-navigation/native";
import AccountsTransac from "../Accounts";
import MyExpenses from "../MyExpenses";
import Predictions from "../Predictions";
import HistoryTransaction from "../HistoryTransaction";
import Accounts2 from "../Accounts";

const Tab = createBottomTabNavigator();

const NavigateToAddIncomeExpense = (props) => {
  props.navigation.navigate("AddIncomeExpense");
};

function BottomHomeNav(props) {
  const [username, setUsername] = useState();
  useEffect(() => {
    const a = async () => {
      try {
        const value = await AsyncStorage.getItem("username");
        if (value !== null) {
          setUsername(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    a();
  });

  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },
        }}
      >
        {
          //Tab Screens
        }
        <Tab.Screen
          name={"Home"}
          component={HomeIncomExpense}
          // children={() => <IncomeExpenses propUsername={username} />}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.centeringIcon}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? "#2d388a" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Transactions"}
          component={Transactions}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.centeringIcon}>
                <FontAwesome5
                  name="chart-bar"
                  size={20}
                  color={focused ? "#2d388a" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
        {
          //extra tabs
        }
        <Tab.Screen
          name={"ActionButton"}
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() => NavigateToAddIncomeExpense(props)}
              >
                <LinearGradient
                  style={styles.ActionbarBtnStyle}
                  colors={["#ff00d4", "#00ddff", "#ff00d4"]}
                  start={{ x: 0.1, y: 0.1 }}
                  end={{ x: 1, y: 3 }}
                >
                  <Image
                    source={require("../../assets/add.png")}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: "white",
                    }}
                  ></Image>
                </LinearGradient>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Categories"}
          component={Categories}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.centeringIcon}>
                <MaterialIcons
                  name="lightbulb"
                  size={23}
                  color={focused ? "#2d388a" : "gray"}
                ></MaterialIcons>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Accounts"}
          component={Accounts}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.centeringIcon}>
                <FontAwesome5
                  name="history"
                  size={20}
                  color={focused ? "#2d388a" : "gray"}
                ></FontAwesome5>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: "#2d388a",
          position: "absolute",
          bottom: 78,
          left: 50,
          borderRadius: 50,
          transform: [
            {
              translateX: tabOffsetValue,
            },
          ],
        }}
      ></Animated.View>
    </>
  );
}
function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 80;
  return width / 5;
}
function HomeIncomExpense() {
  return <IncomeExpenses />;
}
function EmptyScreen() {
  return <Text style>Categories!</Text>;
}
function Transactions() {
  return <MyExpenses />;
}
function Categories() {
  return <Predictions />;
}
function Accounts() {
  return <HistoryTransaction />;
}

const styles = StyleSheet.create({
  ActionbarBtnStyle: {
    width: 55,
    height: 55,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  TabsStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomHomeNav;
