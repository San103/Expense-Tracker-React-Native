import React from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessages from "../ErrorMessages";
import AppPicker from "./AppPicker";

function AppFormPicker({ name, items, placeholder, ...otherProps }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
        {...otherProps}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
