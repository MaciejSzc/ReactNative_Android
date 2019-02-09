import React, { Component } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import Icon from "react-native-vector-icons/FontAwesome"
import LogOutButton from "../common/LogOutButton"
import {
  exitFlat,
  fetchAdminStatus,
  switchDeleteModal
} from "../../actions/myFlat"
import { onNameChange, switchDeleteProfileModal } from "../../actions/auth"
import { saveUserName } from "../../actions/utils"
import { switchLoading } from "../../actions/loading"
import { BackgroundWrapper, ExitFlatButton } from "../common"
import { DeleteProfileButton } from "../common/DeleteProfileButton"
import DeleteRoomModal from "../common/DeleteRoomModal"
import DeleteProfileModal from "../common/DeleteProfileModal"

class ProfileScreen extends Component {
  componentDidMount() {
    const { id } = this.props.flat
    this.props.fetchAdminStatus(id, this.props.auth.uid)
  }

  _handleExitFlatButton() {
    this.props.exitFlat(this.props.auth.uid, this.props.flat.id)
  }

  handleNameInput(name) {
    this.props.onNameChange(name)
  }

  handleSaveButton() {
    const { uid, name } = this.props.auth
    saveUserName(uid, name)
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.flat
    id !== prevProps.flat.id &&
      this.props.fetchAdminStatus(id, this.props.auth.uid)
  }

  _handleDeleteRoomButton() {
    this.props.switchDeleteModal(true)
  }

  _handleDeleteUserButton() {
    this.props.switchDeleteProfileModal(true)
  }

  renderDeleteRoomButton() {
    if (this.props.flat.isAdmin) {
      return (
        <TouchableOpacity
          onPress={this._handleDeleteRoomButton.bind(this)}
          style={styles.delteButtonContainerStyle}>
          <Icon name='trash' size={25} color='#fff' />
          <Text style={styles.smallTextStyle}>Delete Room</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const { isAdmin, id } = this.props.flat
    return (
      <BackgroundWrapper>
        <Image
          source={require("../../../icons/logo.png")}
          size={80}
          style={{ marginBottom: 64 }}
        />
        <LogOutButton />
        <ExitFlatButton
          disabled={isAdmin || !id}
          onPress={this._handleExitFlatButton.bind(this)}
        />
        <DeleteProfileButton
          onPress={this._handleDeleteUserButton.bind(this)}
        />
        {this.renderDeleteRoomButton()}
        <DeleteRoomModal />
        <DeleteProfileModal />
      </BackgroundWrapper>
    )
  }
}

const styles = StyleSheet.create({
  delteButtonContainerStyle: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#fff"
  },
  smallTextStyle: {
    color: "#fff",
    fontSize: 16
  }
})

const mapStateToProps = state => ({
  auth: state.auth,
  flat: state.myFlat
})

const mapDispatchToProps = {
  switchLoading,
  exitFlat,
  onNameChange,
  fetchAdminStatus,
  switchDeleteModal,
  switchDeleteProfileModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)
