import React, { Component } from "react"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import Icon from "react-native-vector-icons/FontAwesome"
import { connect } from "react-redux"
import { deleteRoom, exitFlat, switchDeleteModal } from "../../actions/myFlat"
import { resetSummary } from "../../actions/summary"

class DeleteRoomModal extends Component {
  _handleDeleteButton() {
    const { id } = this.props.flat
    const { uid } = this.props.auth
    deleteRoom()
    this.props.switchDeleteModal(false)
    this.props.resetSummary()
    this.props.exitFlat(uid, id)
  }

  _handleNoButton() {
    this.props.switchDeleteModal(false)
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
        isVisible={this.props.flat.isDeleteModalVisible}
        style={modalStyle}>
        <View style={modalWindow}>
          <Text style={bigFontStyle}>
            Do you really want to Delete this room?
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
                onPress={this._handleDeleteButton.bind(this)}
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
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { deleteRoom, switchDeleteModal, resetSummary, exitFlat }
)(DeleteRoomModal)
