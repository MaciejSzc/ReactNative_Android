import React from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"

export const DeleteProfileButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.buttonContainerStyle}>
      <Icon name='user-times' size={25} color='#fff' />
      <Text style={styles.smallTextStyle}>Delete Account</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  smallTextStyle: {
    fontSize: 16,
    color: "#fff"
  },
  buttonContainerStyle: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#fff"
  }
})
