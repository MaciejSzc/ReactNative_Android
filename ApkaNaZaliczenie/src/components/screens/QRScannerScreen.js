import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { BarCodeScanner, Permissions } from "expo"
import { connect } from "react-redux"
import { saveFlatId, fetchFlatId, joinFlat } from "../../actions/myFlat"
import { switchLoading } from "../../actions/loading"

class QRScannerScreen extends React.Component {
  state = {
    hasCameraPermission: null
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === "granted" })
  }

  componentDidUpdate(prevProps) {
    !!this.props.flat.id && this.props.navigation.navigate("invite")
  }

  _handleBackButton() {
    this.props.navigation.goBack()
  }

  handleBarCodeScanned = async ({ data }) => {
    const { uid, name } = this.props.auth
    this.props.switchLoading(true)
    await saveFlatId(uid, data)
    await fetchFlatId(uid)
    await joinFlat(data, uid, name)
    this.props.navigation.navigate("summary")
    this.props.switchLoading(false)
  }

  render() {
    const { hasCameraPermission } = this.state
    const { containerStyle, cameraStyle } = styles
    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    }
    return (
      <View style={containerStyle}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned.bind(this)}
          style={cameraStyle}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cameraStyle: {
    minHeight: 300,
    minWidth: 300
  },
  containerStyle: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  }
})

const mapStateToProps = state => ({
  auth: state.auth,
  flat: state.myFlat,
  summary: state.summary
})

export default connect(
  mapStateToProps,
  { fetchFlatId, switchLoading }
)(QRScannerScreen)
