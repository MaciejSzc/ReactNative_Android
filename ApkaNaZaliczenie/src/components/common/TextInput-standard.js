import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

export const TextInputStandard = (props) => {
  const { label, maxLength, secureTextEntry, multiline, error, onChangeText, value, placeholder, numberOfLines, keyboardType } = props
  const { textInputStyle, container, labelStyle, inputContainerStyle, errorStyle } = styles


  return (
    <View style={container}>
      <Text style={labelStyle}>{label}</Text>
      <View style={inputContainerStyle}>
        <TextInput
          value={value}
          keyboardType={keyboardType}
          textAlign='center'
          style={textInputStyle}
          maxLength={maxLength}
          multiline={multiline}
          onChangeText={onChangeText}
          numberOfLines={numberOfLines}
          placeholder={placeholder}
          placeholderTextColor='rgba(255,255,255,0.7)'
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  labelStyle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5
  },
  inputContainerStyle: {
    width: 200,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  textInputStyle: {
    color: '#fff',
    fontSize: 16,
    margin: 10,
    alignSelf: 'center',
    width: '90%'
  },
  errorStyle: {
    color: 'rgba(204, 0, 0, 0.2)'
  }
});