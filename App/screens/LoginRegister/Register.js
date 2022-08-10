import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { DatabaseConnection } from "../../components/Database/dbConnection";
import { useNavigation } from "@react-navigation/native";

import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import Screen from "../../components/Screen";
import ErrorMessages from "../../components/ErrorMessages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../config/colors";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string()
    .required()
    .min(4, "Your password is too short")
    .label("Password"),
  repeatPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Your Password do not Match")
    .label("Repeat Password"),
});

const db = DatabaseConnection.getConnection();

function Register(props) {
  //function Component
  const [UserName, setUsername] = useState("");
  const navigation = useNavigation();
  const storeData = async (passname) => {
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
          source={require("../../assets/signup.png")}
        />
      </View>
      <Formik
        initialValues={{ username: "", password: "", repeatPassword: "" }}
        onSubmit={({ username, password }) =>
          db.transaction(function (tx) {
            tx.executeSql(
              "INSERT INTO table_user (username, user_password) VALUES (?,?)",
              [username, password],
              (tx, results) => {
                console.log("Results", results.rowsAffected);
                if (results.rowsAffected > 0) {
                  navigation.navigate("HomeNav");
                  setUsername(username);
                  storeData(username);
                } else console.log("Error 404, not found");
              }
            );
          })
        }
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <AppTextInput
              placeholder="Create Username"
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
              placeholder="Create Password"
              icon="lock"
              autoCapitalize="none"
              autoCorrect={false}
              bg1="#5F48F5"
              bg2="#88F7F9"
              bg3="#048FFF"
              style={{ width: "100%" }}
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              secureTextEntry
            />
            <ErrorMessages error={errors.password} visible={touched.password} />
            <AppTextInput
              placeholder="Repeat Password"
              icon="lock"
              autoCapitalize="none"
              autoCorrect={false}
              bg1="#5F48F5"
              bg2="#88F7F9"
              bg3="#048FFF"
              style={{ width: "100%" }}
              onBlur={() => setFieldTouched("repeatPassword")}
              onChangeText={handleChange("repeatPassword")}
              secureTextEntry
            />
            <ErrorMessages
              error={errors.repeatPassword}
              visible={touched.repeatPassword}
            />
            <Button
              style={{
                height: 45,
                marginVertical: 30,
                justifyContent: "center",
                backgroundColor: "dodgerblue",
                borderRadius: 50,
              }}
              icon="check"
              mode="contained"
              onPress={handleSubmit}
            >
              Signup
            </Button>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
        <AppText style={{ alignSelf: "center" }}>
          Already have an account? Log in here!
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

export default Register;
