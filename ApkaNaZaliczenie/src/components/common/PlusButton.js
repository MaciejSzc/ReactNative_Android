import React from "react"
import Icon from "react-native-vector-icons/Feather"
import { TouchableOpacity } from "react-native"

export const PlusButton = props => {
  const { onPress, disabled } = props
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Icon name='plus-square' size={30} color='#fff' />
    </TouchableOpacity>
  )
}
