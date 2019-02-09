import React, { Component } from "react"
import { View, Text, StyleSheet, FlatList, ImageBackground } from "react-native"
import { connect } from "react-redux"
import LoadingIndicator from "../common/LoadingIndicator"
import { PersonalSummaryItem, ButtonFull } from "../common"
import { switchLoading } from "../../actions/loading"
import { getName } from "../../actions/auth"
import { getExpensesData } from "../../actions/expense"
import {
  getSummary,
  getPersonalSummary,
  getMembersList,
  fetchMembersProfiles,
  resetSummary,
  getReckoning,
  getMembersListFromExpensesData
} from "../../actions/summary"

class SummaryScreen extends Component {
  componentDidMount() {
    this.props.getName(this.props.auth.uid)
  }

  _keyExtractor = (item, index) => index.toString()

  async componentDidUpdate(prevProps) {
    let flatId = this.props.flat.id
    let expensesData = this.props.expensesData
    let { members } = this.props.summary

    this.props.switchLoading(true)

    prevProps.flat.id !== flatId && this.props.getExpensesData(flatId)
    if (prevProps.expensesData !== expensesData) {
      await this.props.getSummary(expensesData)
      this.props.getMembersListFromExpensesData(expensesData)
    }

    if (prevProps.summary.members !== members && !!members) {
      this.props.resetSummary()
      members.forEach(member => {
        this.props.getPersonalSummary(member, expensesData)
      })
    }
    this.props.switchLoading(false)
  }

  handleReckoning() {
    this.props.getReckoning(
      this.props.summary.summary,
      this.props.summary.personalSummaries
    )
    this.props.navigation.navigate("reckoning")
  }

  renderSummary(summary) {
    const { headerText, smallTextStyle } = styles

    if (!!summary) {
      return (
        <View>
          <Text style={headerText}>Total expenses:</Text>
          <Text style={headerText}>{summary.toString()}</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={headerText}>No expenses yet </Text>
          <Text style={{ ...smallTextStyle, textAlign: "center" }}>
            Add your first expenses
          </Text>
          <Text style={{ ...smallTextStyle, textAlign: "center" }}>or</Text>
          <Text style={{ ...smallTextStyle, textAlign: "center" }}>
            Join new room
          </Text>
        </View>
      )
    }
  }

  render() {
    const { headerText, containerStyle, backgroundImage } = styles
    const { summary, personalSummaries } = this.props.summary
    return (
      <ImageBackground
        source={require("../../../images/background-gradient.png")}
        style={backgroundImage}>
        <View style={containerStyle}>{this.renderSummary(summary)}</View>
        <ButtonFull
          label='Summary'
          disabled={!(personalSummaries.length > 0)}
          onPress={this.handleReckoning.bind(this)}
        />
        <FlatList
          keyExtractor={this._keyExtractor}
          data={personalSummaries}
          renderItem={({ item }) => <PersonalSummaryItem props={item} />}
        />
        <LoadingIndicator />
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 32
  },
  smallTextStyle: {
    fontSize: 16,
    color: "#fff"
  },
  containerStyle: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#fff",
    justifyContent: "center",
    padding: 16,
    margin: 16,
    marginTop: 40
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center"
  }
})

const mapStateToProps = state => ({
  summary: state.summary,
  auth: state.auth,
  flat: state.myFlat,
  expensesData: state.expensesData
})

const mapDispatchToProps = {
  getName,
  getSummary,
  getPersonalSummary,
  getExpensesData,
  getReckoning,
  getMembersList,
  fetchMembersProfiles,
  resetSummary,
  switchLoading,
  getMembersListFromExpensesData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryScreen)
