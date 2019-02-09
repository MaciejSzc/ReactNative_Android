import React, { Component } from "react"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import Icon from "react-native-vector-icons/FontAwesome"
import { connect } from "react-redux"
import { switchDeleteProfileModal, deleteUser } from "../../actions/auth"

class DeleteRoomModal extends Component {
  _handleDeleteButton() {
    this.props.deleteUser()
  }

  _handleNoButton() {
    this.props.switchDeleteProfileModal(false)
  }

  render() {
    const {
      modalWindow,
      bigFontStyle,
      modalStyle,
      iconStyle,
      iconsContainerStyle
    } = styles
    return (
      <Modal isVisible={this.props.auth.isDeleteModal} style={modalStyle}>
        <View style={modalWindow}>
          <Text style={bigFontStyle}>
            Do you really want to Delete your Account?
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
  { switchDeleteProfileModal, deleteUser }
)(DeleteRoomModal)
