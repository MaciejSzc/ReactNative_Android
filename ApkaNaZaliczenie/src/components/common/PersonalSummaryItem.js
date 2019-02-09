import React, { Component } from "react"
import { Text, View, StyleSheet } from "react-native"

export const PersonalSummaryItem = ({ props }) => {
  const { container, headerText, numStyle } = styles
  return (
    <View style={container}>
      <Text style={headerText}>{props.member}</Text>
      <Text style={numStyle}>{props.personalSummary} £</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    flex: 3,
    fontSize: 16,
    color: "#fff"
  },
  numStyle: {
    flex: 2,
    fontSize: 16,
    color: "#fff",
    alignSelf: "stretch",
    textAlign: "right"
  },
  container: {
    flexDirection: "row",
    padding: 8,
    minWidth: "70%",
    borderBottomWidth: 1,
    borderColor: "#fff",
    justifyContent: "center"
  }
})
