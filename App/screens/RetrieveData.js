import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

function RetrieveData(props) {
  const [amount, setAmount] = useState();
  const [username, setUsername] = useState();
  const [getId, setId] = useState();

  useEffect(() => {
    const a = async () => {
      try {
        const value = await AsyncStorage.getItem("Balance");
        const valueUsername = await AsyncStorage.getItem("username");
        const valueId = await AsyncStorage.getItem("userId");
        if (value !== null) {
          setAmount(value);
        }
        if (valueUsername !== null) {
          setUsername(valueUsername);
        }
        if (valueId !== null) {
          setId(valueId);
        }
      } catch (e) {
        console.log(e);
      }
    };
    a();
  });

  return (
    <Screen>
      <AppText>Amount Save: {amount}</AppText>
      <AppText>Username: {username}</AppText>
      <AppText>Id: {getId}</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default RetrieveData;
