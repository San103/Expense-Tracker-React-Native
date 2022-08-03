import React from "react";
import { View, Text } from "react-native";
import NumberFormat from "react-number-format";

function FormatNumber({ value2 }) {
  return (
    <View>
      <NumberFormat
        value={value2}
        decimalScale={2}
        displayType="text"
        thousandSeparator
        prefix="$"
        renderText={(value) => (
          <Text
            style={{
              paddingVertical: 10,
              fontSize: 35,
              fontFamily: "NunitoMedium",
              color: "white",
            }}
          >
            {value}
          </Text>
        )}
      />
    </View>
  );
}

export default FormatNumber;
