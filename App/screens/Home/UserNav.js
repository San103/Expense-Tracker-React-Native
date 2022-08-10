import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../config/colors";
import Icon from "../../components/Icon";
import AppText from "../../components/AppText";
import { useNavigation } from "@react-navigation/native";

function UserNav({ title, subtitle, image }) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  // const ContactLinking = () => {
  //   Linking.openURL("https://www.google.com");
  // };
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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="cog" size={40} backgroundColor="white" iconColor="gray" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <View
            style={{
              width: 200,
              height: 250,
              borderRadius: 10,
              backgroundColor: "rgba(255, 255, 255, 1)",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPressOut={() => {
                setModalVisible(false);
              }}
            >
              <Icon
                name={"expand-arrows-alt"}
                backgroundColor={colors.primarySecondPair}
                iconColor={colors.white}
                size={45}
                bRadius={2}
                styles={{
                  marginVertical: 10,
                  alignSelf: "center",
                  borderColor: "transparent",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => null}>
              <AppText style={styles.textsAbout}>Contact Us</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AboutUs")}>
              <AppText style={styles.textsAbout}>About Us</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => BackHandler.exitApp()}>
              <AppText style={[styles.textsAbout, { color: "red" }]}>
                Exit
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  textsAbout: {
    fontFamily: "NunitoMedium",
    paddingVertical: 15,
    fontSize: 20,
    color: colors.dark,
    textAlign: "center",
  },
  containerParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
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
