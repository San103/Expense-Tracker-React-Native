import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import Screen from "../../components/Screen";
import { DatabaseConnection } from "../../components/Database/dbConnection";
import ErrorMessages from "../../components/ErrorMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomHomeNav from "../Home/BottomHomeNav";

const validationSchema = () =>
  Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().label("Password"),
  });

const db = DatabaseConnection.getConnection();

function Login(props) {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log("User Exist:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_user", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(20), user_password VARCHAR(255))",
              []
            );
          }
        }
      );
    });
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_income'",
        [],
        function (tx, res) {
          console.log("Transaction Exist:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_income", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_income(income_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER(255) ,type VARCHAR(255),amountBalance INTEGER(1000000), date VARCHAR(255), dateMonth VARCHAR(255),  category VARCHAR(255),color VARCHAR(255), note VARCHAR(255), repeat INTEGER(255), endDate VARCHAR(255))",
              []
            );
          }
        }
      );
    });
    check();
  }, []);
  const check = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT *  FROM table_user", [], (tx, results) => {
        if (results.rows.length > 0) {
          props.navigation.navigate("HomeNav");
          //const tot = results.rows.item(0).totalBal;
        }
      });
    });
  };
  //Validate User's Input
  const getUserInformation = (uname, pass) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_user where username =? and user_password =?",
        [uname, pass],
        (tx, results) => {
          if (results.rows.length > 0) {
            const text = results.rows.item(0).username;
            usernameAsync(text);

            props.navigation.navigate("HomeNav");
          } else {
            ToastAndroid.show("No Record Found!", ToastAndroid.SHORT);
          }
        }
      );
    });
  };

  //Store username in AsyncStorage
  const usernameAsync = async (passname) => {
    try {
      await AsyncStorage.setItem("username", passname);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Screen style={{ justifyContent: "center" }}>
      <View style={styles.logoCotainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/signin2.png")}
        />
      </View>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={({ username, password }) => {
          getUserInformation(username, password);
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <AppTextInput
              placeholder="Username"
              icon="user"
              autoCapitalize="none"
              autoCorrect={false}
              bg1="#5F48F5"
              bg2="#88F7F9"
              bg3="#048FFF"
              style={{ width: "100%" }}
              onBlur={() => setFieldTouched("username")}
              onChangeText={handleChange("username")}
            />
            <ErrorMessages error={errors.username} visible={touched.username} />
            <AppTextInput
              placeholder="Password"
              icon="lock"
              autoCapitalize="none"
              autoCorrect={false}
              bg1="#5F48F5"
              bg2="#88F7F9"
              bg3="#048FFF"
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              style={{ width: "100%" }}
              secureTextEntry
            />
            <ErrorMessages error={errors.password} visible={touched.password} />
            <Button
              style={{
                height: 45,
                marginVertical: 30,
                justifyContent: "center",
                borderRadius: 50,
                backgroundColor: "dodgerblue",
              }}
              mode="contained"
              onPress={handleSubmit}
            >
              Login
            </Button>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
        <AppText style={{ alignSelf: "center", fontFamily: "NunitoRegular" }}>
          Haven't registered yet? Register Now
        </AppText>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoCotainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
