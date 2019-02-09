import React from "react"

import FeatherIcon from "react-native-vector-icons/Feather"
import { TouchableOpacity } from "react-native"

export const DeleteButton = props => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <FeatherIcon
        name='trash'
        size={20}
        color={props.disabled ? "rgba(255,255,255,0.5)" : "#fff"}
      />
    </TouchableOpacity>
  )
}
