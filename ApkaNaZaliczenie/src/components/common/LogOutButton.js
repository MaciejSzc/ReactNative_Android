import React from "react"
import Icon from "react-native-vector-icons/Feather"
import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { onLogout } from "../../actions/auth"
import { connect } from "react-redux"

export class LogOutButton extends React.Component {
  handleLogOut() {
    this.props.onLogout()
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handleLogOut.bind(this)}
        style={styles.buttonContainerStyle}>
        <Icon name='power' size={25} color='#fff' />
        <Text style={styles.smallTextStyle}>Logout</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  smallTextStyle: {
    fontSize: 16,
    color: "#fff"
  },
  buttonContainerStyle: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#fff"
  }
})

export default connect(
  null,
  { onLogout }
)(LogOutButton)
