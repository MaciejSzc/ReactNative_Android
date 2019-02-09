import React from 'react';
import { StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker'


export const DatePickerCustom = ({ date, onDateChange }) => {

  const handleDatePicked = () => {
    alert('data')
  }

  const hideDateTimePicker = () => {
    alert('czas')
  }

  return (
    <DatePicker
      style={styles.datePickerStyle}
      date={date}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
      minDate="2016-05-01"
      maxDate="2055-01-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          color: '#fff',
          marginLeft: 36,
          borderColor: '#fff',
          borderRadius: 50,
          height: 50
        },
        placeholderText: {
          color: '#fff'
        }
      }}
      onDateChange={onDateChange}
    />
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32
  },
  smallTextStyle: {
    fontSize: 16,
    color: '#fff'
  },
  buttonsContainerStyle: {
    flexDirection: 'row'
  },
  datePickerStyle: {
    width: 200,
    height: 50,
    margin: 20
  }
})