import React, { Component } from "react"
import { StyleSheet, Text, View } from "react-native"
import { connect } from "react-redux"
import QRCode from "react-native-qrcode"
import { switchLoading } from "../../actions/loading"
import LoadingIndicator from "../common/LoadingIndicator"
import { BackgroundWrapper, ButtonFull } from "../common"

export class InviteScreen extends Component {
  renderQRCode(myFlat) {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.smallTextStyle}>
          Let your flatmate scan it with Chip-in app.
        </Text>
        <QRCode value={myFlat} size={200} bgColor='black' fgColor='white' />
      </View>
    )
  }

  handleJoinButton() {
    this.props.navigation.navigate("qrscan")
  }

  handleLoadingButton() {
    this.props.switchLoading()
  }

  renderJoinButton() {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.smallTextStyle}>You have no flat!</Text>
        <Text style={styles.smallTextStyle}>
          you can join your mate's flat by scanning his QRCode
        </Text>
        <ButtonFull
          label='JOIN FLAT'
          onPress={this.handleJoinButton.bind(this)}
        />
      </View>
    )
  }

  render() {
    const { smallTextStyle } = styles
    const myFlat = this.props.myFlat
    return (
      <BackgroundWrapper>
        {!!myFlat ? this.renderQRCode(myFlat) : this.renderJoinButton()}
        <LoadingIndicator />
      </BackgroundWrapper>
    )
  }
}

const styles = StyleSheet.create({
  smallTextStyle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 50
  },
  containerStyle: {
    justifyContent: "center",
    alignItems: "center"
  }
})

const mapStateToProps = state => ({
  myFlat: state.myFlat.id
})

export default connect(
  mapStateToProps,
  { switchLoading }
)(InviteScreen)
