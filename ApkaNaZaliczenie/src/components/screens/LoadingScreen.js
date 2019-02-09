import React from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  NetInfo,
  View,
  Text
} from "react-native"
import { connect } from "react-redux"
import { BackgroundWrapper } from "../common"
import {
  checkLoginStatus,
  listenFlatId,
  getName,
  onInternetStatusChange
} from "../../actions/auth"
import { fetchFlatId } from "../../actions/myFlat"
import { getExpensesData } from "../../actions/expense"

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.props.auth.uid && this.props.navigation.navigate("main")
    console.log("sprawdzam online z propsow ", this.props.auth.isOnline)
  }

  renderStatusInfo() {
    if (!this.props.auth.isOnline) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.smallTextStyle}>
            Check your internet connection
          </Text>
        </View>
      )
    } else {
      return <ActivityIndicator size={"large"} color={"#fff"} />
    }
  }

  render() {
    return (
      <BackgroundWrapper>
        <Image
          source={require("../../../icons/logo.png")}
          size={80}
          style={{ marginBottom: 32 }}
        />
        {this.renderStatusInfo()}
      </BackgroundWrapper>
    )
  }
}

const styles = StyleSheet.create({
  smallTextStyle: {
    fontSize: 16,
    color: "#fff"
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    checkLoginStatus,
    listenFlatId,
    fetchFlatId,
    getExpensesData,
    getName,
    onInternetStatusChange
  }
)(LoadingScreen)
