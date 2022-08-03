import React from "react";
import { StyleSheet, SafeAreaView, View, ScrollView } from "react-native";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    flex: 1,
  },
});

export default Screen;
