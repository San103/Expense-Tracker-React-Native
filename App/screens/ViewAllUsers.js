import React, { useState } from "react";
import { FlatList, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { DatabaseConnection } from "../components/Database/dbConnection";
import DeleteData from "../components/Database/DeleteData";

const db = DatabaseConnection.getConnection();

//Display all users
const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  db.transaction((tx) => {
    tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
      var temp = [];
      for (let i = 0; i < results.rows.length; ++i)
        temp.push(results.rows.item(i));
      setFlatListItems(temp);
    });
  });

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={{
          backgroundColor: "#EEE",
          marginTop: 20,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Text style={styles.textheader}>Id</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>

        <Text style={styles.textheader}>Nome</Text>
        <Text style={styles.textbottom}>{item.username}</Text>

        <Text style={styles.textheader}>Contato</Text>
        <Text style={styles.textbottom}>{item.user_password}</Text>
        <DeleteData inputUserIdPassed={item.user_id} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
  },
  textbottom: {
    color: "#111",
    fontSize: 18,
  },
});

export default ViewAllUser;
