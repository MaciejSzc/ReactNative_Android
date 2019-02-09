import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Octicons"

export const ExitFlatButton = props => {
  console.log("to z exit buttna ;", props.disabled)
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={styles.buttonStyle}>
      <Icon
        name='sign-out'
        size={25}
        color={props.disabled ? "rgba(255,255,255,0.5)" : "#fff"}
      />
      <Text style={styles.smallTextStyle}>Exit Room</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#fff"
  },
  smallTextStyle: {
    fontSize: 16,
    color: "#fff"
  }
})
