import React from "react"
import {
  LayoutAnimation,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import FeatherIcon from "react-native-vector-icons/Feather"
import { connect } from "react-redux"
import { selectItem } from "../../actions/selection"
import { getSummary } from "../../actions/summary"
import { deleteExpense } from "../../actions/expense"
import { DeleteButton } from "./DeleteButton"

class ExpensesListItem extends React.Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  handleDescriptionButton(key) {
    this.props.selectItem(key)
  }

  handleDeleteButton(key) {
    this.props.deleteExpense(key)
    this.props.getSummary()
  }
  renderDetails(description, date, name) {
    return (
      <View style={sytles.descriptionContainerStyle}>
        <Text style={sytles.dateStyle}>
          {!!date ? date.toString() : "Unknown"}
        </Text>
        <Text style={sytles.nameStyle}>~{name}</Text>
        <Text style={sytles.descriptionStyle}>
          {!!description ? description.toString() : "no description"}
        </Text>
      </View>
    )
  }

  render() {
    const {
      topContainerStyle,
      mainContainerStyle,
      titleStyle,
      titleContainerStyle,
      binIconStyle,
      amountStyle
    } = sytles

    const { title, date, key, amount, description, name } = this.props.item

    let selectedItem = this.props.selectedItem
    return (
      <View style={mainContainerStyle}>
        <View style={topContainerStyle}>
          <TouchableOpacity
            style={titleContainerStyle}
            onPress={() => this.handleDescriptionButton(key)}>
            <Text style={titleStyle}>{title}</Text>
          </TouchableOpacity>

          <Text style={amountStyle}>
            {!!amount ? amount.toString() : "Priceless?"}
          </Text>
          <View style={binIconStyle}>
            <DeleteButton
              disabled={!this.props.admin}
              onPress={() => this.handleDeleteButton(key)}
            />
          </View>
        </View>
        {selectedItem === key && this.renderDetails(description, date, name)}
      </View>
    )
  }
}

const sytles = StyleSheet.create({
  topContainerStyle: {
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderRadius: 50,
    margin: 16,
    backgroundColor: "rgba(255,255,255,0.1)"
  },
  mainContainerStyle: {},
  titleStyle: {
    color: "#fff",
    fontSize: 20,
    padding: 16
  },
  titleContainerStyle: {
    flex: 7,
    borderRightWidth: 1,
    borderRightColor: "#fff",
    marginRight: 16
  },
  amountStyle: {
    color: "#fff",
    fontSize: 20,
    flex: 2
  },
  binIconStyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 10
  },
  descriptionContainerStyle: {
    backgroundColor: "rgba(255,255,255,0.1)",
    flex: 1,
    alignSelf: "center",
    padding: 16,
    borderRadius: 50,
    minWidth: 300
  },
  dateStyle: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "flex-start"
  },
  descriptionStyle: {
    color: "#fff",
    fontSize: 16
  },
  nameStyle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14
  }
})

const mapStateToProps = state => {
  return {
    selectedItem: state.selection.selectedItem,
    admin: state.myFlat.isAdmin
  }
}

export default connect(
  mapStateToProps,
  { selectItem, deleteExpense, getSummary }
)(ExpensesListItem)
