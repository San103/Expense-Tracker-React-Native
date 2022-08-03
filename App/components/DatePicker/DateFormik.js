import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext, useField } from "formik";
import AppDatePicker from "./AppDatePicker";

function DateFormik({ name, ...props }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return <AppDatePicker {...props} />;
}

const styles = StyleSheet.create({
  container: {},
});

export default DateFormik;
