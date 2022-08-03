import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Screen from "../Screen";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "../AppText";
import Icon from "../Icon";
import colors from "../../config/colors";

function AppPicker({
  icon,
  bg1 = "#FBD52D",
  bg2 = "#EF3A7B",
  bg3 = "#FF70AF",
  iconColor = "#fff",
  style,
  PickerItemComponent,
  numberOfColumns = 1,
  onSelectItem,
  selectedItem,
  style2,
  items,
  placeholder,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, style]}>
          <LinearGradient
            style={styles.LGStyle}
            colors={[
              selectedItem ? selectedItem.backgroundColor : bg1,
              bg2,
              bg3,
            ]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 1, y: 3 }}
          >
            {icon && (
              <FontAwesome5Icon
                name={selectedItem ? selectedItem.icon : icon}
                size={15}
                color={iconColor}
                style={styles.icon}
              />
            )}
          </LinearGradient>
          {selectedItem ? (
            <AppText style={[styles.textCategory, { color: colors.dark }]}>
              {selectedItem.label}
            </AppText>
          ) : (
            <AppText style={styles.textCategory}>{placeholder}</AppText>
          )}

          <FontAwesome5Icon
            name={"chevron-down"}
            size={20}
            color="#9E9E9E"
            style={{ alignSelf: "center", paddingRight: 10 }}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="fade">
        <Screen>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Icon
              size={50}
              backgroundColor="white"
              iconColor="gray"
              name="times"
              styles={{
                shadowColor: "#b3aba2",
                elevation: 5,
                alignSelf: "center",
                marginBottom: 20,
              }}
            ></Icon>
          </TouchableOpacity>
          <FlatList
            numColumns={numberOfColumns}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    shadowColor: "#b3aba2",
    elevation: 5,
  },
  LGStyle: {
    height: 35,
    width: 35,
    flexDirection: "row",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textCategory: {
    flex: 1,
    width: "100%",
    textAlignVertical: "center",
    height: 35,
    fontSize: 18,
  },
  icon: {
    alignSelf: "center",
  },
});

export default AppPicker;
