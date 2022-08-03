import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStoreData = (title, value) => {
  async () => {
    try {
      await AsyncStorage.setItem(title, value);
    } catch (e) {
      console.log(e);
    }
  };
};

export default AsyncStoreData;
