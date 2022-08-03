import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import AppdropDownMonth from "./DropDownPicker/AppdropDownMonth";
import AppText from "./AppText";
// import AppdropDownnDays from "./DropdownPicker/AppdropDownDays";

function AppReapetEnabled({ style }) {
  const [downMonth, setdownMonth] = useState("Every?");
  const [openModal, setModal] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModal(true)}>
        <View style={[styles.container, style]}>
          <AppText style={[styles.textStyle]}>{downMonth}</AppText>
          <FontAwesome5Icon
            name={"chevron-down"}
            size={20}
            color="#9E9E9E"
            style={{ alignSelf: "center", paddingRight: 10 }}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={openModal} animationType="fade" transparent={true}>
        <View style={styles.innerContainer}>
          <View style={styles.containerStyle}>
            <View style={styles.titleStyle}>
              <AppText style={styles.titleModalStyle}>Repeat Every?</AppText>
            </View>
            <View style={styles.dropDownStyle}>
              <AppdropDownMonth
                onSelectItem={(item) => {
                  setdownMonth(item.label);
                }}
              />
            </View>
            <View style={styles.modalStyles}>
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                  setdownMonth("Every?");
                }}
                style={styles.touchStyle}
              >
                <AppText style={styles.textStyleModal}>Cancel</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                }}
                style={styles.touchStyle}
              >
                <AppText style={styles.textStyleModal}>Set</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "45%",
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 8,
    paddingLeft: 20,
    shadowColor: "gray",
    elevation: 2,
  },
  containerStyle: {
    backgroundColor: "white",
    shadowColor: "gray",
    elevation: 2,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.25,
    borderRadius: 20,
  },
  innerContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    flex: 1,
    color: "#9E9E9E",
    width: "100%",
    textAlignVertical: "center",
    height: 35,
    fontSize: 15,
  },
  titleStyle: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  titleModalStyle: {
    fontSize: 18,
  },
  textStyleModal: {
    fontSize: 13,
    textTransform: "uppercase",
    fontWeight: "400",
    paddingHorizontal: 18,
  },
  modalStyles: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 15,
  },
  touchStyle: {
    marginBottom: 25,
  },
  dropDownStyle: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
});

export default AppReapetEnabled;
