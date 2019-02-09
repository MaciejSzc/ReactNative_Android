import React from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { connect } from "react-redux"
import { TextInputStandard } from "../common/TextInput-standard"
import { ButtonFull, BackgroundWrapper } from "../common"
import { onStartLogin, onEmailChange, onPwdChange } from "../../actions/auth"
import LoadingIndicator from "../common/LoadingIndicator"

class LoginScreen extends React.Component {
  handleEmailInput(email) {
    this.props.onEmailChange(email)
  }

  handlePwdInput(password) {
    this.props.onPwdChange(password)
  }

  handleLoginButton() {
    this.props.onStartLogin()
  }

  handleSignupButton() {
    this.props.navigation.navigate("Signup")
  }

  render() {
    const { email, password, isLoading, error, uid } = this.props.auth
    const {
      smallTextStyle,
      horizontalLine,
      indicatorStyle,
      errorStyle
    } = styles

    return (
      <BackgroundWrapper>
        <Image
          source={require("../../../icons/logo.png")}
          size={80}
          style={{ marginBottom: 32 }}
        />
        <TextInputStandard
          label='Email'
          maxLenght={32}
          placeholder='example@email.com'
          value={email}
          onChangeText={email => this.handleEmailInput(email)}
          error={error}
        />
        <TextInputStandard
          label='Password'
          placeholder='secret password'
          secureTextEntry={true}
          value={password}
          onChangeText={password => this.handlePwdInput(password)}
        />
        {!!error && (
          <View style={errorStyle}>
            <Text style={smallTextStyle}>{error}</Text>
          </View>
        )}
        <ButtonFull
          label='Log in'
          onPress={this.handleLoginButton.bind(this)}
          disabled={isLoading}
        />
        <Text style={smallTextStyle}>or</Text>
        <ButtonFull
          label='Sign up'
          onPress={this.handleSignupButton.bind(this)}
          disabled={isLoading}
        />
        <LoadingIndicator />
      </BackgroundWrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 32
  },
  smallTextStyle: {
    fontSize: 16,
    color: "#fff"
  },
  horizontalLine: {
    width: "100%",
    marginVertical: 50,
    borderWidth: 1,
    borderColor: "#fff"
  },
  indicatorStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    margin: 15
  },
  errorStyle: {
    color: "#fff",
    backgroundColor: "rgba(204, 0, 0, 0.2)",
    padding: 16,
    borderRadius: 50
  }
})

const mapStateToProps = state => ({ auth: state.auth })

export default connect(
  mapStateToProps,
  { onStartLogin, onEmailChange, onPwdChange }
)(LoginScreen)
