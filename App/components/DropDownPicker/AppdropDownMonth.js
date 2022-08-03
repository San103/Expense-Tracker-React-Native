import React, { useState } from "react";

import { View, StyleSheet } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

export default function AppdropDown({ onSelectItem }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    { label: "Everyday/ Daily", value: "day" },
    { label: "Every Week/ 7 days", value: "week" },
    { label: "Every 15 days", value: "days" },
    { label: "Every Month/ 30 days", value: "month" },
    { label: "Every Year", value: "year" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        placeholder="Select Often"
        style={{ borderColor: "#9E9E9E" }}
        zIndex={1000}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="LIGHT"
        onSelectItem={onSelectItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 25,
  },
});
