import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { DatabaseConnection } from "./dbConnection";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const db = DatabaseConnection.getConnection();

function DeleteData({ inputUserIdPassed, tablename, newValue }) {
  let [flatListItems, setFlatListItems] = useState([]);

  let deleteUser = (inputUserId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  table_income where income_id=?",
        [inputUserId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Sucess",
              "Deleted Successfully !",
              [
                {
                  text: "Ok",
                  onPress: () => null,
                },
              ],
              { cancelable: false }
            );
          } else {
            alert("404 not Found !");
          }
        }
      );
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        {
          deleteUser(inputUserIdPassed);
        }
      }}
    >
      <FontAwesome5Icon name="trash" size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DeleteData;
