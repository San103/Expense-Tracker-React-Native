import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomHomeNav from "./App/screens/Home/BottomHomeNav";
import AddIncomeExpenseNav from "./App/screens/AddIncomeExpenseNav";
import AddIncome from "./App/screens/AddIncomeExpense/AddIncome";
import Login from "./App/screens/LoginRegister/Login";
import Register from "./App/screens/LoginRegister/Register";
import SuccessIndicator from "./App/components/SuccessIndicator";
import {
  useFonts,
  Montserrat_400Regular as MontserratRegular,
  Montserrat_500Medium as MontserratMedium,
  Montserrat_600SemiBold as MontserratSemibold,
} from "@expo-google-fonts/montserrat";
import {
  Nunito_400Regular as NunitoRegular,
  Nunito_500Medium as NunitoMedium,
  Nunito_600SemiBold as NunitoSemiBold,
  Nunito_700Bold as NunitoBold,
} from "@expo-google-fonts/nunito";
import IncomeExpenses from "./App/screens/IncomeExpenses";
import UnderMentainance from "./App/components/UnderMentainance";
import { DatabaseConnection } from "./App/components/Database/dbConnection";
import Accounts from "./App/screens/Accounts";
import ViewAllTransac from "./App/screens/Expenses/ViewAllTransac";
import AboutUs from "./App/screens/Home/AboutUs";
const Stack = createNativeStackNavigator();

const db = DatabaseConnection.getConnection();

//Should be commented cause its inappropriate
// const check = () => {
//   db.transaction((tx) => {
//     tx.executeSql("SELECT *  FROM table_user", [], (tx, results) => {
//       return results.rows.length > 0;
//     });
//   });
// };
// Navigate to Home Directly when user = true

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName={"Login"}
  >
    <Stack.Screen name="IncomeExpenses" component={IncomeExpenses} />
    <Stack.Screen name="SuccessIn" component={SuccessIndicator} />
    <Stack.Screen
      name="AstronotUnderMentainance"
      component={UnderMentainance}
    />
    <Stack.Screen name="ViewAllTransactions" component={ViewAllTransac} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="AllUsers" component={Accounts} />
    <Stack.Screen name="AboutUs" component={AboutUs} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="HomeNav" component={BottomHomeNav} />
    <Stack.Screen name="AddIncomeExpense" component={AddIncomeExpenseNav} />
    <Stack.Screen name="AddIncome" component={AddIncome} />
  </Stack.Navigator>
);

export default function App() {
  let [fontsLoaded] = useFonts({
    MontserratRegular,
    MontserratMedium,
    MontserratSemibold,
    NunitoSemiBold,
    NunitoRegular,
    NunitoMedium,
    NunitoBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
