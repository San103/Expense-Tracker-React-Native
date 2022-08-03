import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AppText from "../AppText";

function AppEndDate({ title, onPress }) {
  //Current Date to Display Default
  const dateName = "End Date";
  const dateNow = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const sanDate = dateNow + "/" + (month + 1) + "/" + year;
  //useState For Setting Date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState(dateName);

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
    if (fDate === sanDate) {
      setText(dateName);
    } else {
      setText(fDate);
    }
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => showMode("date")}>
        <View style={styles.container}>
          <AppText style={[styles.textStyle]}>{text}</AppText>
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
          minimumDate={new Date()}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "45%",
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 8,
    paddingLeft: 20,
    shadowColor: "gray",
    elevation: 2,
  },
  textStyle: {
    flex: 1,
    color: "#9E9E9E",
    width: "100%",
    textAlignVertical: "center",
    height: 35,
    fontSize: 15,
  },
});

export default AppEndDate;
