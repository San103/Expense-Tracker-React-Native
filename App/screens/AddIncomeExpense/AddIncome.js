import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Switch, Animated } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DarkTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import AppReapetEnabled from "../../components/AppReapetEnabled";
import AppEndDate from "../../components/DatePicker/AppEndDate";
import AppDatePicker from "../../components/DatePicker/AppDatePicker";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import CategoryPickerItem from "../../components/IncomeExpenseComp/CategoryPickerItem";
import Screen from "../../components/Screen";
import Incomecategories from "./DataCategories/IncomeCat";
import ErrorMessages from "../../components/ErrorMessages";
import AppFormPicker from "../../components/IncomeExpenseComp/AppFormPicker";
import { DatabaseConnection } from "../../components/Database/dbConnection";
import DateFormik from "../../components/DatePicker/DateFormik";

const validationSchema = () =>
  Yup.object().shape({
    AmountSalary: Yup.number().required().min(1).max(1000000).label("Amount"),
    note: Yup.string().label("Note"),
    category: Yup.object().required().nullable().label("Category"),
  });
const db = DatabaseConnection.getConnection();

//Function Component
function AddIncome(props) {
  //Variable Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //Animation
  const isEnabledAnimationValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [getid, setId] = useState();

  //Insert into Database
  const insertData = (uid, bal, date, category, note, repeat, endDate) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO table_income (user_id,amountBalance,date,category,note,repeat,endDate)  VALUES (?,?,?,?,?,?,?)",
        ["52", bal, date, category, note, repeat, endDate],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            navigation.push("HomeNav");
          } else console.log("Error 404, not found");
        }
      );
    });
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid={true}>
      <Screen style={{ paddingTop: 20 }}>
        <AppText
          style={{
            color: "gray",
            alignSelf: "center",
          }}
        >
          Amount:
        </AppText>
        <Formik
          initialValues={{ AmountSalary: "", category: "", note: "" }}
          onSubmit={({ AmountSalary, category, note, date }) => {
            insertData(
              getid,
              AmountSalary,
              "12",
              category.label,
              note,
              "2",
              "01"
            );
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            values,
            setFieldTouched,
            setFieldValue,
            touched,
          }) => (
            <>
              <View
                style={{ marginTop: 5, alignItems: "center", marginBottom: 10 }}
              >
                <AppTextInput
                  placeholder="0.00"
                  bg1="transparent"
                  bg2="transparent"
                  bg3="transparent"
                  maxLength={7}
                  iconColor="#FFD500"
                  icon="ruble-sign"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numeric"
                  style={{
                    padding: 15,
                    paddingLeft: 40,
                    justifyContent: "center",
                    width: "50%",
                  }}
                  onBlur={() => setFieldTouched("AmountSalary")}
                  onChangeText={handleChange("AmountSalary")}
                />
                <ErrorMessages
                  error={errors.AmountSalary}
                  visible={touched.AmountSalary}
                />
              </View>
              <AppFormPicker
                name="category"
                items={Incomecategories}
                numberOfColumns={3}
                PickerItemComponent={CategoryPickerItem}
                placeholder="Category"
                icon="list-alt"
              />

              <AppDatePicker
              // value={values.date}
              // name={"date"}
              // onChange={(date2) => {
              //   setFieldValue("date", date2), console.log(date2);
              // }}
              />

              <AppTextInput
                placeholder="Note"
                icon="book-open"
                maxLength={155}
                multiline
                autoCapitalize="none"
                autoCorrect={false}
                bg1="#5F48F5"
                bg2="#88F7F9"
                bg3="#048FFF"
                style={{ width: "100%" }}
                onBlur={() => setFieldTouched("note")}
                onChangeText={handleChange("note")}
              />

              <View style={styles.SwitchStyle}>
                <AppText
                  fontSize={20}
                  color="gray"
                  style={{ paddingRight: 10 }}
                >
                  Repeat?
                </AppText>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  onChange={() => {
                    if (isEnabled) {
                      Animated.timing(isEnabledAnimationValue, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false,
                      }).start();
                    } else {
                      Animated.timing(isEnabledAnimationValue, {
                        toValue: 80,
                        duration: 300,
                        useNativeDriver: false,
                      }).start();
                    }
                  }}
                />
              </View>
              <Animated.View
                style={{
                  height: isEnabledAnimationValue,
                }}
              >
                <View style={styles.animatedStyle}>
                  <AppReapetEnabled></AppReapetEnabled>
                  <AppEndDate />
                </View>
              </Animated.View>
              <Button
                style={{
                  height: 45,
                  marginBottom: 80,
                  justifyContent: "center",
                }}
                icon="check"
                mode="contained"
                theme={DarkTheme}
                onPress={handleSubmit}
              >
                Save
              </Button>
            </>
          )}
        </Formik>
      </Screen>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  SwitchStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  animatedStyle: {
    flexDirection: "row",
  },
});

export default AddIncome;
