import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncRetrieveData = (title) => {
  const [item, setItem] = useState();
  async () => {
    try {
      const value = await AsyncStorage.getItem(title);
      if (value !== null) {
        setItem(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(item);
};

export default AsyncRetrieveData;
