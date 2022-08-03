import React, { useRef, useState } from "react";
import { View, StyleSheet, Switch, Animated } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DarkTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";

import AppPicker from "../../components/IncomeExpenseComp/AppPicker";
import AppReapetEnabled from "../../components/AppReapetEnabled";
import AppEndDate from "../../components/DatePicker/AppEndDate";
import AppDatePicker from "../../components/DatePicker/AppDatePicker";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import CategoryPickerItem from "../../components/IncomeExpenseComp/CategoryPickerItem";
import Screen from "../../components/Screen";
import ExpenseCategories from "./DataCategories/ExpenseCat";

function AddExpense(props) {
  //Variable Switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  //For Categories
  const [category, setCategory] = useState();
  //Animation
  const isEnabledAnimationValue = useRef(new Animated.Value(0)).current;
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
        <View style={{ marginTop: 5, alignItems: "center", marginBottom: 10 }}>
          <AppTextInput
            placeholder="0.00"
            bg1="transparent"
            bg2="transparent"
            bg3="transparent"
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
          />
        </View>
        <AppPicker
          items={ExpenseCategories}
          selectedItem={category}
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          onSelectItem={(item) => setCategory(item)}
          placeholder="Category"
          icon="list-alt"
          bg1="#FBD52D"
          bg2="#EF3A7B"
          bg3="#FF70AF"
        />

        <AppDatePicker />

        <AppTextInput
          placeholder="Note"
          icon="book-open"
          autoCapitalize="none"
          autoCorrect={false}
          bg1="#5F48F5"
          bg2="#88F7F9"
          bg3="#048FFF"
          style={{ width: "100%" }}
        />
        <View style={styles.SwitchStyle}>
          <AppText fontSize={20} color="gray" style={{ paddingRight: 10 }}>
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
          style={{ height: 45, marginBottom: 80, justifyContent: "center" }}
          icon="check"
          mode="contained"
          theme={DarkTheme}
          onPress={() => console.log("Pressed")}
        >
          Save
        </Button>
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

export default AddExpense;
