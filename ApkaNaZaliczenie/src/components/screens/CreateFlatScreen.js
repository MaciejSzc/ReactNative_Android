import React from "react"
import { StyleSheet, Text } from "react-native"
import { connect } from "react-redux"
import { ButtonFull, BackgroundWrapper } from "../common"
import { startCreateFlat } from "../../actions/myFlat"
import { joinMembers } from "../../actions/summary"
import LoadingIndicator from "../common/LoadingIndicator"

class CreateFlatScreen extends React.Component {
  componentWillMount() {
    this.props.flat && this.props.navigation.navigate("flatBudget")
  }

  handleAddButton() {
    this.props.navigation.navigate("AddExpense")
  }

  handleCreateButton() {
    this.props.navigation.navigate("flatBudget")
    this.props.startCreateFlat()
  }

  componentDidUpdate(prevProps) {
    prevProps.flat !== this.props.flat &&
      this.props.navigation.navigate("flatBudget")
  }

  render() {
    const { smallTextStyle, headerText } = styles
    return (
      <BackgroundWrapper>
        <Text style={smallTextStyle}>
          Press this button to create your flat budget.
        </Text>
        <ButtonFull
          label='Create'
          onPress={this.handleCreateButton.bind(this)}
        />
        <LoadingIndicator />
      </BackgroundWrapper>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 50
  },
  smallTextStyle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 50
  }
})

mapStateToProps = state => ({
  flat: state.myFlat.id,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { startCreateFlat, joinMembers }
)(CreateFlatScreen)
