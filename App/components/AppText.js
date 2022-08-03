import React, { useCallback, useEffect, useState } from "react";

import { View, StyleSheet, Text } from "react-native";

function AppText({ style, children }) {
  return <Text style={[styles.Appstyle, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  Appstyle: {
    fontSize: 15,
    color: "gray",
    fontFamily: "NunitoRegular",
    fontWeight: "normal",
    paddingVertical: 0,
  },
});

export default AppText;
