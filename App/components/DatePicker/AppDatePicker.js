import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import AppText from "../AppText";

function AppDatePicker(
  {
    icon = "calendar-alt",
    bg1 = "#FF70AF",
    bg2 = "#5782F5",
    bg3 = "#5F48F5",
    iconColor = "#fff",
    style,
  },
  props
) {
  //Current Date to Display Default
  const dateNow = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const sanDate = dateNow + "/" + (month + 1) + "/" + year;
  //useState For Setting Date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("" + sanDate);

  //Function Date
  const onChange = (event, selectedData) => {
    const currentDate = selectedData || date;
    setShow();
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => showMode("date")}>
        <View style={[styles.containerDate, style]}>
          <LinearGradient
            style={styles.LinearStyle}
            colors={[bg1, bg2, bg3]}
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
          <AppText style={[styles.textLabel]}>{text}</AppText>
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
    </>
  );
}

const styles = StyleSheet.create({
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

export default AppDatePicker;
