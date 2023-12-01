import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import AppText from "../../components/AppText";
import Screen from "../../components/Screen";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../components/Icon";
import colors from "../../config/colors";

function AboutUs(props) {
  const navigation = useNavigation();
  return (
    <Screen>
      <TouchableOpacity
        style={{ marginTop: 30 }}
        onPress={() => {
          navigation.push("HomeNav");
        }}
      >
        <Icon
          size={50}
          name="chevron-left"
          backgroundColor="transparent"
          styles={{ borderWidth: 0 }}
          iconColor={colors.dark}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 500,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          alignContent: "center",
        }}
      >
        <Image
          style={styles.image}
          source={require("../../assets/profileJ.jpeg")}
        />
        <AppText
          style={{
            fontSize: 25,
            fontFamily: "NunitoSemiBold",
            marginTop: 20,
          }}
        >
          Jessan Palban
        </AppText>
        <AppText>Software Developer</AppText>
        <AppText style={{ textAlign: "center" }}>
          This Application is for educational purposes only for Thesis Project of Jovelyn Torres.
          I am a Software/Web Developer, UI/UX designer System Analyst studied
          in Bohol Island State University- Calape Campus from Tubigo Bohol.
        </AppText>
        <AppText>App Created: April - August 8,2022</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    borderRadius: 45 / 2,
    marginRight: 10,
  },
});

export default AboutUs;
