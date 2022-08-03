import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import AppText from "../../components/AppText";
import { useNavigation } from "@react-navigation/native";

function UserNav({ title, subtitle, image }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.containerParent}>
        <View style={styles.container}>
          <Image style={styles.image} source={image} />
          <View style={styles.textsTitle}>
            <AppText style={styles.titleStyle}>{title}</AppText>
            <AppText style={styles.subtitleStyle}>{subtitle}</AppText>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("SuccessIn")}>
          <Icon name="cog" size={40} backgroundColor="white" iconColor="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    marginRight: 10,
  },
  textsTitle: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  titleStyle: {
    fontSize: 15,
    color: colors.dark,
  },
  subtitleStyle: {
    fontSize: 20,
    color: colors.dark,
    fontFamily: "NunitoMedium",
  },
});

export default UserNav;
