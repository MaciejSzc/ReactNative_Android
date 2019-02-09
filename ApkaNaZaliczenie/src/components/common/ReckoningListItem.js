import React from "react"
import { View, Text, StyleSheet } from "react-native"

export const ReckoningListItem = item => {
  const { name, reckoning } = item.item.item
  const { headerText, numStyle, containerStyle } = styles

  renderConditionalText = reckoning => {
    if (reckoning > 0) {
      return "overpaid " + reckoning
    } else if (reckoning < 0) {
      return "must pay " + reckoning
    } else if (reckoning === 0) {
      return "clear"
    }
  }

  return (
    <View style={containerStyle}>
      <Text style={headerText}>{name}</Text>
      <Text style={numStyle}>{renderConditionalText(reckoning)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    color: "#fff",
    flex: 3
  },
  numStyle: {
    flex: 2,
    fontSize: 16,
    color: "#fff",
    alignSelf: "stretch",
    textAlign: "right"
  },
  containerStyle: {
    flexDirection: "row",
    padding: 8,
    minWidth: "70%",
    borderBottomWidth: 1,
    borderColor: "#fff",
    justifyContent: "center"
  }
})
