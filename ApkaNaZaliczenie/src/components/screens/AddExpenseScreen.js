import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { connect } from "react-redux"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import LoadingIndicator from "../common/LoadingIndicator"
import { switchLoading } from "../../actions/loading"
import {
  onPropChange,
  onSaveExpense,
  resetExpense,
  isExpenseError
} from "../../actions/expense"
import {
  ButtonFull,
  BackgroundWrapper,
  TextInputStandard,
  DatePickerCustom
} from "../common"

class AddExpenseScreen extends React.Component {
  async handleSaveButton() {
    const expense = this.props.expense
    const { uid, name } = this.props.auth
    this.props.switchLoading(true)
    let error = isExpenseError(expense)
    if (!error) {
      await this.props.onSaveExpense(expense, uid, name, error)
      this.props.switchLoading(false)
      this.props.navigation.goBack()
    } else {
      this.props.switchLoading(false)
      alert(error)
    }
  }

  handleCancelButton() {
    this.props.navigation.goBack()
    this.props.resetExpense()
  }

  handleDate(prop, date) {
    this.props.onPropChange(prop, date)
  }

  handleTextChange(prop, val) {
    this.props.onPropChange(prop, val)
  }

  handleNumChange(prop, val) {
    if (!isNaN(val)) {
      let round = Math.round(val)

      this.props.onPropChange(prop, round)
    }
  }

  render() {
    const { headerText, buttonsContainerStyle, container } = styles
    let { amount, title, date, description } = this.props.expense
    if (!amount) {
      amount = ""
    } else {
      amount = amount.toString()
    }
    return (
      <BackgroundWrapper>
        <KeyboardAwareScrollView contentContainerStyle={container}>
          <Text style={headerText}>Add Expense</Text>
          <TextInputStandard
            label='Title'
            placeholder='Add title of your Expense'
            maxLength={20}
            value={title}
            onChangeText={val => this.handleTextChange("title", val)}
          />
          <TextInputStandard
            label='Description'
            placeholder='Optional description here.'
            numberOfLines={2}
            maxLength={80}
            value={description}
            onChangeText={val => this.handleTextChange("description", val)}
          />
          <TextInputStandard
            label='Amount'
            placeholder='£'
            maxLength={5}
            keyboardType='numeric'
            multiline={true}
            value={amount}
            onChangeText={val => this.handleNumChange("amount", val)}
          />
          <DatePickerCustom
            date={date}
            onDateChange={date => this.handleDate("date", date)}
          />
          <View style={buttonsContainerStyle}>
            <ButtonFull
              label='Cancel'
              onPress={this.handleCancelButton.bind(this)}
            />
            <ButtonFull
              label='Save'
              onPress={this.handleSaveButton.bind(this)}
            />
          </View>
          <LoadingIndicator />
        </KeyboardAwareScrollView>
      </BackgroundWrapper>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 20
  },
  smallTextStyle: {
    fontSize: 16,
    color: "#fff"
  },
  buttonsContainerStyle: {
    flexDirection: "row"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

const MapStateToProps = state => ({
  expense: state.expense,
  auth: state.auth
})

export default connect(
  MapStateToProps,
  { onPropChange, onSaveExpense, resetExpense, switchLoading }
)(AddExpenseScreen)
