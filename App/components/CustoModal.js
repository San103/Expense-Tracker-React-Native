import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

export const CustoModal = ({
  children,
  visible,
  onRequestClose,
  onPressOverlay,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback
        onPress={onPressOverlay}
      ></TouchableWithoutFeedback>
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
