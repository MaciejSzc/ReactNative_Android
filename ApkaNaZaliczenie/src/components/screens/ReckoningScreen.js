import React, { Component } from "react"
import { View, Text, StyleSheet, ImageBackground, FlatList } from "react-native"
import { connect } from "react-redux"
import { ReckoningListItem, ButtonFull } from "../common"
import ResetRoomModal from "../common/ResetRoomModal"
import { switchResetModal } from "../../actions/summary"

class ReckoningScreen extends Component {
  _handleResetButton() {
    this.props.switchResetModal(true)
  }

  render() {
    const { reckoning, isResetModalVisible } = this.props.summary
    const { backgroundImage, headerText, listContainerStyle } = styles
    const { isAdmin } = this.props.flat

    _keyExtractor = (item, index) => index.toString()

    return (
      <ImageBackground
        source={require("../../../images/background-gradient.png")}
        style={backgroundImage}>
        <View>
          <Text style={headerText}> </Text>
        </View>
        <View style={listContainerStyle}>
          <FlatList
            keyExtractor={_keyExtractor}
            data={reckoning}
            renderItem={item => <ReckoningListItem item={item} />}
          />
        </View>
        <ButtonFull
          disabled={!isAdmin}
          label='Reset room'
          onPress={this._handleResetButton.bind(this)}
        />
        <ResetRoomModal isModalVisible={isResetModalVisible} />
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
  containerStyle: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    padding: 16,
    margin: 16,
    marginTop: 40
  },
  listContainerStyle: {
    maxHeight: "70%"
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
  flat: state.myFlat
})

const mapDispatchToProps = { switchResetModal }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReckoningScreen)
