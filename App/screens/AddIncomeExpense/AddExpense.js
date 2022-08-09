import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Switch,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DarkTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import AppReapetEnabled from "../../components/AppReapetEnabled";
import AppEndDate from "../../components/DatePicker/AppEndDate";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import CategoryPickerItem from "../../components/IncomeExpenseComp/CategoryPickerItem";
import Screen from "../../components/Screen";
import ExpenseCategories from "./DataCategories/ExpenseCat";
import ErrorMessages from "../../components/ErrorMessages";
import AppFormPicker from "../../components/IncomeExpenseComp/AppFormPicker";
import { DatabaseConnection } from "../../components/Database/dbConnection";
import moment from "moment";

const validationSchema = () =>
  Yup.object().shape({
    AmountExpense: Yup.number().required().min(1).max(1000000).label("Amount"),
    note: Yup.string().label("Note"),
    category: Yup.object().required().nullable().label("Category"),
  });
const db = DatabaseConnection.getConnection();

//Function Component
function AddExpense({ icon = "calendar-alt", iconColor = "#fff" }) {
  //Variable Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //Animation
  const isEnabledAnimationValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [getid, setId] = useState();

  //get Date Today default
  const dateToday = new Date();
  const sanDate = moment(dateToday.setMonth(dateToday.getMonth())).format(
    "YYYYMMDD"
  );

  //useState For Setting Date
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("" + sanDate);
  const [text2, setText2] = useState("" + "Today");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  const r = date2;
  let monthName;
  //get date when clicke
  let monthName2 = months[r - 1];
  if (monthName2 === undefined) {
    monthName = months[d.getMonth()];
  } else {
    monthName = months[r - 1];
  }

  //Function Date
  const onChange = (event, selectedData) => {
    const currentDate = selectedData || date;
    setShow();
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    setDate2(tempDate.getMonth() + 1);

    //Date for DAtabse save
    let fDate = moment(tempDate.setMonth(tempDate.getMonth())).format(
      "YYYYMMDD"
    );
    setText(fDate);

    //Date For Displya
    let fDate2 = moment(tempDate.setMonth(tempDate.getMonth())).format(
      "MMMM DD, YYYY"
    );
    setText2(fDate2);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  //Insert into Database
  const insertData = (
    uid,
    bal,
    date,
    dMonth,
    category,
    color,
    note,
    repeat,
    endDate
  ) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO table_income (user_id,type,amountBalance,date,dateMonth,category,color,note,repeat,endDate)  VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          "52",
          "expense",
          bal,
          date,
          dMonth,
          category,
          color,
          note,
          repeat,
          endDate,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            navigation.navigate("SuccessIn");
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
          initialValues={{ AmountExpense: "", category: "", note: "" }}
          onSubmit={({ AmountExpense, category, note, date }) => {
            insertData(
              getid,
              AmountExpense,
              text,
              monthName,
              category.label,
              category.backgroundColor,
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
                  onBlur={() => setFieldTouched("AmountExpense")}
                  onChangeText={handleChange("AmountExpense")}
                />
                <ErrorMessages
                  error={errors.AmountExpense}
                  visible={touched.AmountExpense}
                />
              </View>
              <AppFormPicker
                name="category"
                items={ExpenseCategories}
                numberOfColumns={3}
                PickerItemComponent={CategoryPickerItem}
                placeholder="Category"
                icon="list-alt"
              />

              <TouchableWithoutFeedback onPress={() => showMode("date")}>
                <View style={[styles.containerDate]}>
                  <LinearGradient
                    style={styles.LinearStyle}
                    colors={["#FF70AF", "#5782F5", "#5F48F5"]}
                    start={{ x: 0.1, y: 0.1 }}
                    end={{ x: 1, y: 3 }}
                  >
                    {icon && (
                      <FontAwesome5Icon
                        name={icon}
                        size={15}
                        color={iconColor}
                        style={styles.iconDesign}
                      />
                    )}
                  </LinearGradient>
                  <AppText style={[styles.textLabel]}>{text2}</AppText>
                  <FontAwesome5Icon
                    name={"chevron-down"}
                    size={20}
                    color="#9E9E9E"
                    style={{ alignSelf: "center", paddingRight: 10 }}
                  />
                </View>
              </TouchableWithoutFeedback>
              {show && (
                <DateTimePickerAndroid
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChange}
                />
              )}

              <AppTextInput
                placeholder="Note"
                icon="book-open"
                maxLength={15}
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

              {/* <View style={styles.SwitchStyle}>
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
              </Animated.View> */}
              <Button
                style={{
                  marginTop: 20,
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
  containerDate: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    shadowColor: "#b3aba2",
    elevation: 5,
  },
  LinearStyle: {
    height: 35,
    width: 35,
    flexDirection: "row",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textLabel: {
    flex: 1,
    color: "#9E9E9E",
    width: "100%",
    textAlignVertical: "center",
    height: 35,
    fontSize: 18,
  },
  iconDesign: {
    marginHorizontal: 10,
    alignSelf: "center",
  },
});

export default AddExpense;
