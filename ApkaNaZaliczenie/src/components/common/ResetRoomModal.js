import React, { Component } from "react"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import Icon from "react-native-vector-icons/FontAwesome"
import { connect } from "react-redux"
import NavigationService from "../../navigation/NavigationService"
import { resetRoom } from "../../actions/myFlat"
import { switchResetModal } from "../../actions/summary"

class ResetRoomModal extends Component {
  _handleResetButton() {
    resetRoom(this.props.flat.id)
    this.props.switchResetModal(false)
    NavigationService.navigate("summary")
  }

  _handleNoButton() {
    this.props.switchResetModal(false)
  }

  render() {
    const {
      modalWindow,
      bigFontStyle,
      smallFontStyle,
      modalStyle,
      iconStyle,
      iconsContainerStyle
    } = styles
    return (
      <Modal
        isVisible={this.props.summary.isResetModalVisible}
        style={modalStyle}>
        <View style={modalWindow}>
          <Text style={bigFontStyle}>
            Do you really want to reset this room?
          </Text>
          <Text style={smallFontStyle}>
            This decision will be irreversible.
          </Text>
          <View style={iconsContainerStyle}>
            <TouchableOpacity>
              <Icon
                onPress={this._handleNoButton.bind(this)}
                style={iconStyle}
                name='times'
                size={26}
                color='#fff'
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                onPress={this._handleResetButton.bind(this)}
                style={iconStyle}
                name='check'
                size={26}
                color='#fff'
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalWindow: {
    maxWidth: "80%",
    backgroundColor: "#222",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#fff"
  },
  bigFontStyle: {
    color: "#fff",
    fontSize: 26,
    margin: 10
  },
  smallFontStyle: {
    color: "#fff",
    padding: 10
  },
  modalStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  iconStyle: {
    margin: 26
  },
  iconsContainerStyle: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around"
  }
})

const mapStateToProps = state => ({
  flat: state.myFlat,
  summary: state.summary
})

export default connect(
  mapStateToProps,
  { resetRoom, switchResetModal }
)(ResetRoomModal)
