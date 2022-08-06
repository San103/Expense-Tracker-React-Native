import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { DatabaseConnection } from "../components/Database/dbConnection";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DeleteData from "../components/Database/DeleteData";

const db = DatabaseConnection.getConnection();

const Accounts = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_income", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  });

  let listItemView = (item) => {
    return (
      <View
        key={item.income_id}
        style={{
          backgroundColor: "#EEE",
          marginTop: 20,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Text style={styles.textheader}>Primary Id</Text>
        <Text style={styles.textbottom}>{item.income_id}</Text>

        <Text style={styles.textheader}>Foreign Id</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>

        <Text style={styles.textheader}>Type</Text>
        <Text style={styles.textbottom}>{item.type}</Text>

        <Text style={styles.textheader}>Balance</Text>
        <Text style={styles.textbottom}>{item.amountBalance}</Text>

        <Text style={styles.textheader}>Starting Date</Text>
        <Text style={styles.textbottom}>{item.date}</Text>
        <Text style={styles.textheader}>Month</Text>
        <Text style={styles.textbottom}>{item.dateMonth}</Text>

        <Text style={styles.textheader}>Category</Text>
        <Text style={styles.textbottom}>{item.category}</Text>
        <Text style={styles.textheader}>Color</Text>
        <Text style={styles.textbottom}>{item.color}</Text>

        <Text style={styles.textheader}>Note</Text>
        <Text style={styles.textbottom}>{item.note}</Text>

        <Text style={styles.textheader}>Repeat</Text>
        <Text style={styles.textbottom}>{item.repeat}</Text>

        <Text style={styles.textheader}>End Date</Text>
        <Text style={styles.textbottom}>{item.endDate}</Text>

        <DeleteData inputUserIdPassed={item.income_id} />
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

export default Accounts;
