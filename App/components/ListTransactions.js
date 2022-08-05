import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "../config/colors";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "./AppText";
import { DatabaseConnection } from "./Database/dbConnection";
import { useNavigation } from "@react-navigation/native";
import { Nunito_500Medium } from "@expo-google-fonts/nunito";

const db = DatabaseConnection.getConnection();

function ListTransactions({
  name = "fast-food",
  size = 45,
  Linearbackground = "#ff00d4",
  Linearbackground2 = "#00ddff",
  Linearbackground3 = "#fbb040",
  iconColor = "#fff",
  title,
  titleColor = "red",
  notitle,
  subtitle,
  DateTransac,
  inputUserIdPassed,
}) {
  const navigation = useNavigation();
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
                  onPress: () => navigation.push("HomeNav"),
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
    <View style={styles.containerParent}>
      <View style={styles.container}>
        <LinearGradient
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          colors={[Linearbackground, Linearbackground2, Linearbackground3]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 1, y: 3 }}
        >
          <FontAwesome5Icon name={name} color={iconColor} size={size * 0.4} />
        </LinearGradient>
        <View style={styles.textsTitle}>
          <AppText style={styles.titleStyle}>{title}</AppText>
          {notitle === "" ? null : (
            <AppText style={[styles.titleStyle, { fontSize: 15 }]}>
              {notitle}
            </AppText>
          )}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          marginHorizontal: 15,
          alignItems: "flex-end",
        }}
      >
        <AppText style={[styles.subtitleStyle, titleColor]}>{subtitle}</AppText>
        <AppText style={{ fontSize: 12 }}>{DateTransac}</AppText>
      </View>
      <View style={{ alignItems: "center", marginRight: 8 }}>
        <TouchableOpacity onPress={() => deleteUser(inputUserIdPassed)}>
          <FontAwesome5Icon name="trash" color="#F63145" size={size * 0.4} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: "grey",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  textsTitle: {
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  titleStyle: {
    fontSize: 17,
    color: colors.dark,
    fontFamily: "NunitoMedium",
  },
  subtitleStyle: {
    fontSize: 16,
    fontFamily: "NunitoMedium",
    color: colors.black,
  },
});

export default ListTransactions;
