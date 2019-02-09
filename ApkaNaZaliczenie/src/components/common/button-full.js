import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export const ButtonFull = (props) => {
  const { label, onPress, disabled } = props
  const { labelStyle, buttonContainerStyle, disabledStyle } = styles
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={buttonContainerStyle}>
        <Text style={!disabled ? labelStyle : disabledStyle}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  labelStyle: {
    color: '#fff',
    marginHorizontal: 30,
    marginVertical: 20,
    fontSize: 16
  },
  buttonContainerStyle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    margin: 15,
    height: 66
  },
  disabledStyle: {
    color: 'rgba(255,255,255,0.5)',
    marginHorizontal: 30,
    marginVertical: 20,
    fontSize: 16
  }
});
