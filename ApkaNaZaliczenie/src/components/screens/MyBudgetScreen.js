import React from "react"
import { connect } from "react-redux"
import { StyleSheet, Text, FlatList, View, ImageBackground } from "react-native"
import { PlusButton } from "../common"
import ExpensesListItem from "../common/ExpensesListItem"
import { getExpensesData } from "../../actions/expense"
import { saveFlatId, fetchAdminStatus } from "../../actions/myFlat"
import LoadingIndicator from "../common/LoadingIndicator"

class MyBudgetScreen extends React.Component {
  componentDidMount() {
    const flatId = this.props.flat.id
    const { uid } = this.props.auth
    this.props.getExpensesData(flatId)
    this.props.fetchAdminStatus(flatId, uid)
  }

  componentDidUpdate(prevProps) {
    const id = this.props.flat.id
    if (id !== prevProps.flat.id) {
      !id && this.props.navigation.navigate("createFlat")
    }
  }

  handleAddButton() {
    this.props.navigation.navigate("Add")
  }

  renderItem(item) {
    return <ExpensesListItem item={item} />
  }

  renderInfo() {
    const { headerContainerStyle, smallTextStyle } = styles
    if (this.props.expensesData.length === 0) {
      return (
        <View style={headerContainerStyle}>
          <Text style={smallTextStyle}>You have no expenses.</Text>
        </View>
      )
    }
  }

  render() {
    const expenses = this.props.expensesData
    const {
      headerText,
      backgroundImage,
      headerContainerStyle,
      plusButtonStyle
    } = styles

    return (
      <ImageBackground
        source={require("../../../images/background-gradient.png")}
        style={backgroundImage}>
        <View style={headerContainerStyle}>
          <Text style={headerText}>Expenses</Text>
          <View style={plusButtonStyle}>
            <PlusButton
              style={plusButtonStyle}
              onPress={this.handleAddButton.bind(this)}
            />
          </View>
        </View>
        {this.renderInfo()}
        <FlatList
          style={{ width: "100%" }}
          data={expenses}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <ExpensesListItem item={item} />}
        />
        <LoadingIndicator />
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    color: "#fff"
  },
  smallTextStyle: {
    fontSize: 16,
    color: "#fff"
  },
  headerContainerStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20
  },
  plusButtonStyle: {
    padding: 16,
    position: "absolute",
    right: 10
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
})

const mapStateToProps = state => ({
  expensesData: state.expensesData,
  auth: state.auth,
  flat: state.myFlat
})

export default connect(
  mapStateToProps,
  { getExpensesData, saveFlatId, fetchAdminStatus }
)(MyBudgetScreen)
