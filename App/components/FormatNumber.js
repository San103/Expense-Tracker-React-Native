import React from "react";
import { View, Text } from "react-native";
import NumberFormat from "react-number-format";

function FormatNumber({ value2, size = 35, color = "white" }) {
  return (
    <View>
      <NumberFormat
        value={value2}
        decimalScale={2}
        displayType="text"
        thousandSeparator
        prefix="₱"
        renderText={(value) => (
          <Text
            style={{
              fontSize: size,
              fontFamily: "NunitoMedium",
              color: color,
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
